/**
 * Función de cifrado César simple para encriptar texto.
 * Desplaza cada carácter en el alfabeto por la clave dada.
 * @param {string} texto - El texto a cifrar.
 * @param {number} clave - El número de posiciones a desplazar.
 * @returns {string} El texto cifrado.
 */
export function cifrarTexto(texto, clave) {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const longitudAlfabeto = alfabeto.length;
    let resultado = "";

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i];
        const indice = alfabeto.indexOf(caracter);

        if (indice !== -1) {
            const nuevoIndice = (indice + clave) % longitudAlfabeto;
            resultado += alfabeto[nuevoIndice];
        } else {
            // Si el carácter no está en el alfabeto, dejarlo igual
            resultado += caracter;
        }
    }

    return resultado;
}

/**
 * Función de descifrado César simple para desencriptar texto.
 * Desplaza cada carácter en el alfabeto por la clave dada en sentido inverso.
 * @param {string} texto - El texto a descifrar.
 * @param {number} clave - El número de posiciones a desplazar.
 * @returns {string} El texto descifrado.
 */
export function descifrarTexto(texto, clave) {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const longitudAlfabeto = alfabeto.length;
    let resultado = "";

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i];
        const indice = alfabeto.indexOf(caracter);

        if (indice !== -1) {
            const nuevoIndice = (indice - clave + longitudAlfabeto) % longitudAlfabeto;
            resultado += alfabeto[nuevoIndice];
        } else {
            // Si el carácter no está en el alfabeto, dejarlo igual
            resultado += caracter;
        }
    }

    return resultado;
}

/**
 * Descarga el contenido de un elemento como imagen PNG.
 * Utiliza html2canvas para capturar el elemento.
 * @param {HTMLElement} elemento - El elemento a capturar.
 * @param {HTMLElement} boton - El botón a ocultar durante la captura.
 * @param {string} nombreArchivo - El nombre del archivo a descargar.
 */
export function descargarPNG(elemento, boton, nombreArchivo) {
  // Ocultar botón de descarga durante la captura
  if (boton) {
    boton.style.display = 'none';
  }

  html2canvas(elemento).then(canvas => {
    const imagenDataURL = canvas.toDataURL("image/png");

    const enlace = document.createElement("a");
    enlace.href = imagenDataURL;
    enlace.download = nombreArchivo;
    enlace.click();
  }).catch(error => {
    console.error("Error al descargar PNG:", error);
  }).finally(() => {
    // Mostrar botón de descarga nuevamente
    if (boton) {
      boton.style.display = 'flex';
    }
  });
}

/**
 * Función auxiliar para descargar desde una URL de datos.
 * @param {string} dataUrl - La URL de datos de la imagen.
 * @param {string} nombreArchivo - El nombre del archivo a descargar.
 */
export function descargarDesdeURL(dataUrl, nombreArchivo) {
  const enlace = document.createElement('a');
  enlace.href = dataUrl;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
}