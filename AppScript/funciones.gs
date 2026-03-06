// Funciones adicionales para el script de registro de asistencia
// Separadas desde codigo.gs para mantener el API en un archivo propio.

// ID de la hoja de cálculo principal
const scriptProperties = PropertiesService.getScriptProperties();
const SPREADSHEET_ID = scriptProperties.getProperty('ID_SHEET');

// Abre la hoja de cálculo por ID
const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

// Hojas de la spreadsheet
const HojaLideres = ss.getSheetByName("Respuestas de formulario 1");

// Arreglo de hojas utilizadas para búsquedas; ampliar según sea necesario
const SHEETS = [HojaLideres];

// Verificar que todas las hojas existen para evitar errores posteriores
function validarHojas() {
  SHEETS.forEach((hoja, idx) => {
    if (!hoja) {
      throw new Error(
        `Hoja en índice ${idx} no encontrada. Revise el nombre o permisos.`,
      );
    }
  });
  Logger.log("Todas las hojas configuradas existen");
}

// Ejecutar validación al cargar el script
validarHojas();

// Constantes para valores de asistencia
const ASISTENCIA_SI = "SI";
const ASISTENCIA_CONFIRMO = "Confirmó";

// Función para obtener la hora actual en zona horaria de Bogotá
function horaBogota() {
  let hora = Utilities.formatDate(
    new Date(),
    "America/Bogota",
    "yyyy-MM-dd HH:mm:ss",
  );
  return hora;
}

// Hora actual al ejecutar el script
const horaAct = horaBogota();

// Columna de asistencia en la hoja
const ultima = HojaLideres.getLastRow();
const datosF2 = HojaLideres.getRange(1, 6, ultima, 1).getValues();
const columnaAsistencia = HojaLideres.getLastColumn();

/**
 * Busca una persona por texto (ID) en las hojas disponibles.
 * @param {string} texto - El ID de la persona a buscar.
 * @param {string} modo - El modo de operación: "ingreso" o "consulta".
 * @param {string} lugar - El lugar: "bodega", "iglesia" o "casa".
 * @returns {Object} Objeto con información de la persona encontrada o no encontrada.
 */
// Búsqueda en todas las hojas configuradas. Devuelve el primer resultado encontrado.
function buscarPersona(texto, modo, lugar) {
  Logger.log(`BuscarPersona: texto=%s modo=%s lugar=%s`, texto, modo, lugar);

  for (const hoja of SHEETS) {
    const resultado = BuscarPersonaEnHoja(hoja, texto, modo, lugar);
    if (resultado.encontrado) {
      Logger.log(
        `Encontrado en hoja %s fila %s`,
        hoja.getName(),
        resultado.fila,
      );
      return resultado;
    }
  }

  Logger.log("Persona no encontrada en ninguna hoja");
  return { encontrado: false };
}

/**
 * Marca la asistencia para bodega. Si ya está marcado, retorna true.
 * @param {Sheet} hoja - La hoja de cálculo.
 * @param {number} fila - La fila de la persona.
 * @returns {boolean} True si ya estaba registrado, false si se marcó ahora.
 */
function ingresoBodega(hoja, fila) {
  return marcarAsistencia(hoja, fila, ASISTENCIA_SI);
}

/**
 * Marca la asistencia para iglesia. Si ya está marcado, retorna true.
 * @param {Sheet} hoja - La hoja de cálculo.
 * @param {number} fila - La fila de la persona.
 * @returns {boolean} True si ya estaba registrado, false si se marcó ahora.
 */
function ingresoIglesia(hoja, fila) {
  return marcarAsistencia(hoja, fila, ASISTENCIA_SI);
}

/**
 * Función auxiliar para marcar asistencia en una celda específica.
 * @param {Sheet} hoja - La hoja de cálculo.
 * @param {number} fila - La fila.
 * @param {string} valor - El valor a marcar.
 * @returns {boolean} True si ya tenía el valor, false si se actualizó.
 */
function marcarAsistencia(hoja, fila, valor) {
  const celda = hoja.getRange(fila, columnaAsistencia);
  const ya = celda.getValue();
  if (ya === valor) {
    Logger.log(
      `marcarAsistencia: hoja=%s fila=%s valor=%s ya registrado`,
      hoja.getName(),
      fila,
      valor,
    );
    return true; // Ya registrado
  }
  celda.setValue(valor);
  Logger.log(
    `marcarAsistencia: hoja=%s fila=%s valor=%s marcado`,
    hoja.getName(),
    fila,
    valor,
  );
  return false; // Se marcó ahora
}

/**
 * Busca una persona en una hoja específica y maneja el registro según modo y lugar.
 * @param {Sheet} hoja - La hoja donde buscar.
 * @param {string} texto - El ID de la persona.
 * @param {string} modo - "ingreso" o "consulta".
 * @param {string} lugar - "bodega", "iglesia" o "casa".
 * @returns {Object} Información de la búsqueda.
 */
function BuscarPersonaEnHoja(hoja, texto, modo, lugar) {
  let yaRegistradoBodega = false;
  let yaRegistradoIglesia = false;
  Logger.log(
    `BuscarPersonaEnHoja hoja=%s texto=%s modo=%s lugar=%s`,
    hoja.getName(),
    texto,
    modo,
    lugar,
  );

  // Usar TextFinder para localizar la celda con el ID rápidamente
  const finder = hoja
    .getRange("F:F")
    .createTextFinder(texto.toString())
    .matchEntireCell(true)
    .findNext();
  if (!finder) {
    Logger.log("No se encontró el ID en la hoja %s", hoja.getName());
    return {
      encontrado: false,
      fila: 0,
      valor: "",
      registradoBodega: false,
      registradoIglesia: false,
      hora: horaAct,
      genero: "",
    };
  }

  const fila = finder.getRow();
  const ministry = hoja.getRange(fila, 2).getValue().toString().toUpperCase();
  const leader144 = hoja.getRange(fila, 3).getValue().toString().toUpperCase();
  const name = hoja.getRange(fila, 4).getValue().toString().toUpperCase();

  if (modo === "ingreso") {
    if (lugar === "bodega") {
      yaRegistradoBodega = ingresoBodega(hoja, fila);
    } else if (lugar === "iglesia") {
      yaRegistradoIglesia = ingresoIglesia(hoja, fila);
    }
  } else if (modo === "consulta") {
    if (lugar === "casa") {
      marcarAsistencia(hoja, fila, ASISTENCIA_CONFIRMO);
    }
  }

  return {
    encontrado: true,
    fila: fila,
    valor: finder.getValue(),
    registradoBodega: yaRegistradoBodega,
    registradoIglesia: yaRegistradoIglesia,
    hora: horaAct,
    name: name,
    ministry: ministry,
    leader144: leader144 != "NO APLICA" ? leader144 : undefined,
  };
}
