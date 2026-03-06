// Constantes de configuración
const ANCHO_REAL = window.innerWidth;
const ALTO_REAL = window.innerHeight;
const TAMANO_QR = 120;
const NIVEL_CORRECCION = 'H'; // Niveles: L, M, Q, H
const CLAVE_CIFRADO = 20; // Clave para el cifrado César


// URLs base y de aplicación
const URL_BASE = "https://yrguativa.github.io/reencuentro_registro/"; // Líderes

// Importar funciones de utilidades
import { cifrarTexto, descargarPNG } from './utilidades/utilidades.js';
import { consultaAsistente } from './utilidades/service.js';
// Elementos del DOM
const contenedorQR = document.getElementById('qrcode');
const botonDescargar = document.getElementById('downloadBtn');
const modal = document.getElementById('modal');
const contenidoModal = document.getElementById("modal-content");
const modalNoRegistrado = document.getElementById("modal-noregistrado");
const modalVerificando = document.getElementById("modal-verificando");
const modalGracias = document.getElementById('modal-gracias');

// Variables globales
let primerNombre = 'Usuario'; // Nombre por defecto
let instanciaQR = null; // Mantener instancia para regenerar el QR

/**
 * Verifica si el ID está registrado en la aplicación externa.
 * Realiza una consulta a la API y muestra el modal correspondiente.
 * @param {string} texto - El ID a verificar.
 */
async function verificarIngreso(identification) {
  try {
    const datos = await consultaAsistente(identification);
    if (datos.encontrado) {
      console.log("Texto encontrado en la fila:", datos.fila);
      document.getElementById('modal-gracias').innerHTML('Bienvenido, ' + datos.name);
      contenidoModal.classList.remove("hidden");
      modalNoRegistrado.classList.add("hidden");
    } else {
      contenidoModal.classList.add("hidden");
      modalNoRegistrado.classList.remove("hidden");
    }

    return datos.encontrado || false;
  } catch (error) {
    console.error("Error al verificar ingreso:", error);
    // Manejar error, quizás mostrar un modal de error
    return false;
  }
  finally {
    modalVerificando.classList.add("hidden");
  }
}

/**
 * Genera el código QR basado en el ID y nombre ingresados.
 * Cifra el ID, crea la URL de redirección y muestra el modal con el QR.
 */
async function generarQR() {
  const textoId = document.getElementById('id').value.replace(/[ .,]/g, "") || '';
  if (textoId.length === 0) {
    return; // No generar si no hay ID
  }

  // Verificar ingreso antes de generar QR
  const encontrado = await verificarIngreso(textoId);

  if (!encontrado) {
    return; // No generar QR si el ID no está registrado
  }
  // Deshabilitar botón de descarga temporalmente
  botonDescargar.disabled = true;

  // Limpiar contenedor del QR
  contenedorQR.innerHTML = '';

  // Mensaje de gracias
  modalGracias.textContent = `¡Gracias por confirmar tu asistencia!`;

  // Cifrar el ID
  const textoCifrado = cifrarTexto(textoId, CLAVE_CIFRADO);

  // Construir URL de redirección
  const urlRedireccion = `${URL_BASE}/ingreso/ingreso.html?id=${textoCifrado}`;

  // Opciones para generar el QR
  const opcionesQR = {
    text: urlRedireccion,
    width: TAMANO_QR,
    height: TAMANO_QR,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel[NIVEL_CORRECCION]
  };

  // Generar el QR en el contenedor
  instanciaQR = new QRCode(contenedorQR, opcionesQR);

  // Mostrar modal
  modal.classList.remove('hidden');

  // Habilitar descarga después de un breve delay para asegurar que el QR se renderice
  setTimeout(() => {
    botonDescargar.disabled = false;
  }, 100);
}

/**
 * Cierra el modal y resetea los estados de los submodales.
 */
function cerrarModal() {
  modal.classList.add('hidden');
  contenidoModal.classList.add("hidden");
  modalNoRegistrado.classList.add("hidden");
  modalVerificando.classList.remove("hidden");
}

// Event listeners
const botonContinuar = document.getElementById('botonContinuar');
const botonVerificar = document.getElementById('botonVerificar');

botonContinuar.addEventListener('click', generarQR);
botonDescargar.addEventListener('click', () => descargarPNG(modal, botonDescargar, `Ticket-${primerNombre}.png`));
botonVerificar.addEventListener('click', cerrarModal);
