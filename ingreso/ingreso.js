
  //Santificación
  // const URLApp= 'https://script.google.com/macros/s/AKfycbyfKldB6V4g-Pz5eXaw8WwBrTqCe4ocuMEBCsVQR0T3tVgzbGOY7MirG5sHoULtVXTx/exec';
  //Líderes
  const URLApp= 'https://script.google.com/macros/s/AKfycbwR-tNcUVVhiOV24UphHCrq0mzDoihvedZ_UcZbDbQd5-rbrdr7tkr-zjheEdaDiG5Vgw/exec';
  
  // Importar función de utilidades
  import { descifrarTexto } from '../utilidades/utilidades.js';

const params = new URLSearchParams(window.location.search);
const idPersona = params.get("id");
// const nombrePersona = params.get("nombre"); // Ya no se usa
console.log(idPersona); // "ABC123"
let SI = document.getElementById("si");
let NO = document.getElementById("no");
let Veri = document.getElementById("veri");
let Info = document.getElementById("info");
let Lugar = document.getElementById("lugar");



const p = 20;

async function Ingresar(lugar) {

  Lugar.style.display = "none";
  Veri.style.display = "flex";

  const idDes = descifrarTexto(idPersona, p);

  const modo = "ingreso";

  const url =
    URLApp +    "?texto=" +    encodeURIComponent(idDes) +    "&modo=" +    encodeURIComponent(modo) +    "&lugar=" +    encodeURIComponent(lugar);
  const res = await fetch(url);
  const data = await res.json();

  if (data.encontrado) {
    // console.log("Texto encontrado en la fila:", data.fila);
    SI.style.display = "flex";
    NO.style.display = "none";
    Veri.style.display = "none";
    Info.style.display = "none";

    if (lugar == "bodega") {
      if (data.registradoBodega) {
        SI.innerHTML = "<p>Upss... <br> Parece que ya ingresó a EF. <br> ❌ </p>";
      } else {
        if(data.genero === "FEMENINO"){SI.innerHTML = "<p> Bienvenida <br> ✅ </p>";} 
        else if(data.genero === "MASCULINO"){SI.innerHTML = "<p> Bienvenido <br> ✅ </p>";} 
        else{SI.innerHTML = "<p> Bienvenido <br> ✅ </p>";} 
      }
    }

    if (lugar == "iglesia") {
      if (data.registradoIglesia) {
        SI.innerHTML =
          "<p>Upss... <br> Parece que ya ingresó a la iglesia. <br> ❌ </p>";
      } else {
        if(data.genero === "FEMENINO"){SI.innerHTML = "<p> Bienvenida <br> ✅ </p>";} 
        else if(data.genero === "MASCULINO"){SI.innerHTML = "<p> Bienvenido <br> ✅ </p>";} 
        else{SI.innerHTML = "<p> Bienvenido <br> ✅ </p>";} 
      }
    }
  } else {
    SI.style.display = "none";
    NO.style.display = "flex";
    Veri.style.display = "none";
    NO.innerHTML = "<p> No se encuentra en la lista." + "<br> ❌ </p>";
    Info.style.display = "none";
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const botonIglesia = document.getElementById('botonIglesia');
  botonIglesia.addEventListener('click', () => Ingresar('iglesia'));
});
  iniciar();
});

function iniciar() {
  if (Ahora < fechaObjetivo) {
    SI.style.display = "none";
    NO.style.display = "none";
    Veri.style.display = "none";
    Lugar.style.display = "none";
    Info.style.display = "flex";
  } else {
    SI.style.display = "none";
    NO.style.display = "none";
    Veri.style.display = "none";
    Lugar.style.display = "flex";
    Info.style.display = "none";
  }
}


