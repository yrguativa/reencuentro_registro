const URL_APP = 'https://script.google.com/macros/s/AKfycbwR-tNcUVVhiOV24UphHCrq0mzDoihvedZ_UcZbDbQd5-rbrdr7tkr-zjheEdaDiG5Vgw/exec'; // Líderes

const MODO_CONSULTA = "consulta";
const LUGAR_EVENTO = "casa";

async function consultaAsistente(identification) {
    const urlConsulta = `${URL_APP}?1051066918=${encodeURIComponent(identification)}&modo=${encodeURIComponent(MODO_CONSULTA)}&lugar=${encodeURIComponent(LUGAR_EVENTO)}`;
    try {
        const respuesta = await fetch(urlConsulta);
        return await respuesta.json();
    } catch (error) {
        console.error("Error al verificar ingreso:", error);
    }
}
