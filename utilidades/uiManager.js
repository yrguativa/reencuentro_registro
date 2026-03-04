/**
 * Gestor de interfaz de usuario para la página de ingreso
 */

// Elementos del DOM
const elementos = {
    lugar: document.getElementById('lugar'),
    verificando: document.getElementById('veri'),
    si: document.getElementById('si'),
    no: document.getElementById('no'),
    info: document.getElementById('info'),
    botonIglesia: document.getElementById('botonIglesia'),
};

/**
 * Oculta todos los elementos principales
 */
export function ocultarTodos() {
    elementos.lugar.classList.add('hidden');
    elementos.verificando.classList.add('hidden');
    elementos.si.classList.add('hidden');
    elementos.no.classList.add('hidden');
    elementos.info.classList.add('hidden');
}

/**
 * Muestra la pantalla de verificación
 */
export function mostrarVerificando() {
    ocultarTodos();
    elementos.verificando.classList.remove('hidden');
}

/**
 * Muestra el formulario de selección de lugar
 */
export function mostrarLugar() {
    ocultarTodos();
    elementos.lugar.classList.remove('hidden');
}

/**
 * Muestra la información del evento
 */
export function mostrarInfo() {
    ocultarTodos();
    elementos.info.classList.remove('hidden');
}

/**
 * Muestra mensaje de bienvenida con personalización por género
 * @param {string} genero - El género de la persona (FEMENINO, MASCULINO, etc)
 * @param {boolean} yaRegistrado - Si la persona ya fue registrada antes
 */
export function mostrarBienvenida(genero, yaRegistrado) {
    ocultarTodos();
    elementos.si.classList.remove('hidden');

    let mensaje = '';

    if (yaRegistrado) {
        mensaje = '<p>Upss... <br> Parece que ya ingresó. <br> ❌ </p>';
    } else {
        if (genero === 'FEMENINO') {
            mensaje = '<p> Bienvenida <br> ✅ </p>';
        } else {
            mensaje = '<p> Bienvenido <br> ✅ </p>';
        }
    }

    elementos.si.innerHTML = mensaje;
}

/**
 * Muestra mensaje de no encontrado
 */
export function mostrarNoEncontrado() {
    ocultarTodos();
    elementos.no.classList.remove('hidden');
    elementos.no.innerHTML = '<p> No se encuentra en la lista. <br> ❌ </p>';
}

/**
 * Registra un event listener en el botón de ingreso
 * @param {Function} callback - Función a ejecutar al hacer clic
 */
export function configurarBotonIglesia(callback) {
    elementos.botonIglesia.addEventListener('click', callback);
}
