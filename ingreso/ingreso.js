
  //Santificación
  // const URLApp= 'https://script.google.com/macros/s/AKfycbyfKldB6V4g-Pz5eXaw8WwBrTqCe4ocuMEBCsVQR0T3tVgzbGOY7MirG5sHoULtVXTx/exec';
  //Líderes
  const URLApp= 'https://script.google.com/macros/s/AKfycbwR-tNcUVVhiOV24UphHCrq0mzDoihvedZ_UcZbDbQd5-rbrdr7tkr-zjheEdaDiG5Vgw/exec';
  
  

const params = new URLSearchParams(window.location.search);
const idPersona = params.get("id");
const nombrePersona = params.get("nombre");
console.log(idPersona); // "ABC123"
let SI = document.getElementById("si");
let NO = document.getElementById("no");
let Veri = document.getElementById("veri");
let Info = document.getElementById("info");
let Lugar = document.getElementById("lugar");

// const FechaObjetivo = new Date("2025-11-18T18:20:00"); //Pruebas 
const fechaObjetivo = new Date("2025-12-18T18:20:00"); // Fecha real
const Ahora = new Date();



const p = 20;

async function Ingresar(lugar) {

  Lugar.style.display = "none";
  Veri.style.display = "flex";

  const idDes = des(idPersona, p);

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
        SI.innerHTML = "<p>Upss... <br> Parece que " +   nombrePersona + " ya ingresó a EF. <br> ❌ </p>";
      } else {
        if(data.genero === "FEMENINO"){SI.innerHTML = "<p> Bienvenida " + nombrePersona + "<br> ✅ </p>";} 
        else if(data.genero === "MASCULINO"){SI.innerHTML = "<p> Bienvenido " + nombrePersona + "<br> ✅ </p>";} 
        else{SI.innerHTML = "<p> Bienvenido " + nombrePersona + "<br> ✅ </p>";} 
      }
    }

    if (lugar == "iglesia") {
      if (data.registradoIglesia) {
        SI.innerHTML =
          "<p>Upss... <br> Parece que " +
          nombrePersona +
          " ya ingresó a la iglesia. <br> ❌ </p>";
      } else {
        if(data.genero === "FEMENINO"){SI.innerHTML = "<p> Bienvenida " + nombrePersona + "<br> ✅ </p>";} 
        else if(data.genero === "MASCULINO"){SI.innerHTML = "<p> Bienvenido " + nombrePersona + "<br> ✅ </p>";} 
        else{SI.innerHTML = "<p> Bienvenido " + nombrePersona + "<br> ✅ </p>";} 
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


function des(texto, clave) {
  const alfabeto =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const largo = alfabeto.length;
  let resultado = "";

  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    const index = alfabeto.indexOf(char);

    if (index !== -1) {
      const nuevoIndex = (index - clave + largo) % largo;
      resultado += alfabeto[nuevoIndex];
    } else {
      resultado += char;
    }
  }

  return resultado;
}


document.addEventListener("DOMContentLoaded", () => {
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


