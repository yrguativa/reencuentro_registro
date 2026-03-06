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
 * Genera el código QR basado en el ID y nombre ingresados.
 * Cifra el ID, crea la URL de redirección y muestra el modal con el QR.
 */
function generarQR() {
  // Mostrar modal
  modal.classList.remove('hidden');

  const textoId = document.getElementById('id').value.replace(/[ .,]/g, "") || '';
  if (textoId.length === 0) {
    modal.classList.add("hidden");
    return; // No generar si no hay ID
  }

  // Verificar ingreso antes de generar QR

  consultaAsistente(textoId)
    .then(datos => {
      if (datos.encontrado) {
        console.log("Texto encontrado en la fila:", datos.fila);

        // Mensaje de gracias
        modalGracias.textContent =  datos.name;
        contenidoModal.classList.remove("hidden");
        modalNoRegistrado.classList.add("hidden");
      } else {
        contenidoModal.classList.add("hidden");
        modalNoRegistrado.classList.remove("hidden");
      }

      // Deshabilitar botón de descarga temporalmente
      botonDescargar.disabled = true;

      // Limpiar contenedor del QR
      contenedorQR.innerHTML = '';
      
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

      // Habilitar descarga después de un breve delay para asegurar que el QR se renderice
      setTimeout(() => {
        botonDescargar.disabled = false;
      }, 100);
    })
    .catch(error => {
      console.error("Error al verificar ingreso:", error);
      // Manejar error, quizás mostrar un modal de error
    })
    .finally(() => {
      modalVerificando.classList.add("hidden");
    });
}


// Event listeners
const botonContinuar = document.getElementById('botonContinuar');
document.getElementById('botonVerificar').addEventListener('click', () => {
  modal.classList.add('hidden');
  contenidoModal.classList.add("hidden");
  modalNoRegistrado.classList.add("hidden");
  modalVerificando.classList.remove("hidden");
});;

botonContinuar.addEventListener('click', () => generarQR());
botonDescargar.addEventListener('click', () => descargarPNG(modal, botonDescargar, `Ticket-${primerNombre}.png`));
