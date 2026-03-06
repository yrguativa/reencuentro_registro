import { URL_APP } from './config.js';

const MODO_CONSULTA = "consulta";
const LUGAR_EVENTO = "casa";

export async function consultaAsistente(identification) {
    const params = new URLSearchParams({
        identification: identification,
        modo: MODO_CONSULTA,
        lugar: LUGAR_EVENTO
    });

    const urlConsulta = `${URL_APP}?${params.toString()}`;
    try {
        const respuesta = await fetch(urlConsulta, { method: 'GET', redirect: 'follow' });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al verificar ingreso:", error);
    }
}
