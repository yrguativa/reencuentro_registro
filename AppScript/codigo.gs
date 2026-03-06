// Código API para servicio de registro de asistencia
// Las funciones auxiliares y constantes se mantienen en funciones.gs.

/**
 * Crea una respuesta de error JSON estandarizada.
 * @param {Error} err - El objeto de error.
 * @param {string} functionName - El nombre de la función donde ocurrió el error.
 * @returns {ContentService} Un objeto de respuesta de texto con el error JSON.
 */
function _createErrorResponse(err, functionName) {
  Logger.log(`Error en ${functionName}: %s`, err.message);
  const errorObj = { error: true, message: err.message };
  return ContentService.createTextOutput(JSON.stringify(errorObj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET /consulta?texto=<id>
 *
 * Este endpoint sólo realiza la operación de consulta (confirmación desde casa).
 * - Parámetros de query: texto (obligatorio)
 *
 * Responde un JSON con el mismo objeto que antes, o un objeto de error.
 */
function doGet(e) {
  try {
    if (!e || !e.parameter) {
      throw new Error("Parámetros ausentes");
    }

    const texto = e.parameter.texto;
    if (!texto) {
      throw new Error("Parámetro 'texto' es obligatorio");
    }

    Logger.log(`doGet (consulta) recibido texto=%s`, texto);

    const resultado = buscarPersona(texto.toString(), "consulta", "casa");
    return ContentService.createTextOutput(JSON.stringify(resultado)).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return _createErrorResponse(err, "doGet");
  }
}

/**
 * POST /registro
 *
 * Este endpoint recibe un cuerpo JSON con los datos de ingreso:
 * {
 *   "texto": "<ID>",
 *   "lugar": "bodega" | "iglesia"
 * }
 *
 * Responde con el resultado de la búsqueda/registro o un error.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Cuerpo de la solicitud ausente");
    }

    const payload = JSON.parse(e.postData.contents);
    const texto = payload.texto;
    const lugar = payload.lugar;

    if (!texto || !lugar) {
      throw new Error("Campos 'texto' y 'lugar' son obligatorios en el cuerpo");
    }

    Logger.log(`doPost (registro) recibido texto=%s lugar=%s`, texto, lugar);

    const resultado = buscarPersona(texto.toString(), "ingreso", lugar);
    return ContentService.createTextOutput(JSON.stringify(resultado)).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return _createErrorResponse(err, "doPost");
  }
}
