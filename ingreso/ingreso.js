
// Importar funciones de utilidades
import { descifrarTexto } from '../utilidades/utilidades.js';
import { URL_APP, MODO_INGRESO, CLAVE_CIFRADO, FECHA_EVENTO } from '../utilidades/config.js';
import { 
  mostrarVerificando, 
  mostrarBienvenida, 
  mostrarNoEncontrado, 
  mostrarLugar, 
  mostrarInfo,
  configurarBotonIglesia 
} from '../utilidades/uiManager.js';

// ==================== CONFIGURACIÓN ====================

const params = new URLSearchParams(window.location.search);
const idPersona = params.get('id');
const fechaActual = new Date();

// ==================== FUNCIONES ====================

/**
 * Construye la URL de consulta a la API
 * @param {string} id - ID desencriptado
 * @param {string} lugar - Ubicación (iglesia, bodega, etc)
 * @returns {string} URL completa para la consulta
 */
function construirUrlConsulta(id, lugar) {
  const params = new URLSearchParams({
    texto: id,
    modo: MODO_INGRESO,
    lugar: lugar,
  });
  return `${URL_APP}?${params.toString()}`;
}

/**
 * Procesa la respuesta del servidor cuando se encuentra a la persona
 * @param {Object} datos - Datos de la respuesta
 * @param {string} lugar - Ubicación registrada
 */
function procesarEncontrado(datos, lugar) {
  let yaRegistrado = false;
  
  if (lugar === 'iglesia' && datos.registradoIglesia) {
    yaRegistrado = true;
  } else if (lugar === 'bodega' && datos.registradoBodega) {
    yaRegistrado = true;
  }
  
  mostrarBienvenida(datos.genero, yaRegistrado);
}

/**
 * Realiza la verificación de ingreso en la API
 * @param {string} lugar - Ubicación (iglesia, bodega, etc)
 */
async function verificarEnAPI(lugar) {
  try {
    const idDesencriptado = descifrarTexto(idPersona, CLAVE_CIFRADO);
    const url = construirUrlConsulta(idDesencriptado, lugar);
    
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    
    if (datos.encontrado) {
      console.log('Persona encontrada en fila:', datos.fila);
      procesarEncontrado(datos, lugar);
    } else {
      mostrarNoEncontrado();
    }
  } catch (error) {
    console.error('Error al verificar ingreso:', error);
    mostrarNoEncontrado();
  }
}

/**
 * Maneja el flujo de ingreso del usuario
 * @param {string} lugar - Ubicación seleccionada
 */
async function ingresarAlEvento(lugar) {
  mostrarVerificando();
  await verificarEnAPI(lugar);
}

/**
 * Inicializa la aplicación según la fecha actual
 */
function inicializarApp() {
  if (fechaActual < FECHA_EVENTO) {
    // Evento aún no ha comenzado
    mostrarInfo();
  } else {
    // Evento ha comenzado, permitir ingreso
    mostrarLugar();
  }
}

// ==================== EVENT LISTENERS ====================

document.addEventListener('DOMContentLoaded', () => {
  inicializarApp();
  configurarBotonIglesia(() => ingresarAlEvento('iglesia'));
});


