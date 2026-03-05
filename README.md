# reencuentro_registro

## Descripción del Proyecto

Este proyecto es un sistema de registro de asistencia para el evento "Reencuentro 2026" de MCIM (Movimiento Cristiano Internacional Misionero). Permite a los invitados confirmar su asistencia, generar tickets con códigos QR y registrar su ingreso al evento en diferentes ubicaciones.

El sistema consta de una aplicación web frontend y un backend basado en Google Apps Script que interactúa con hojas de cálculo de Google Sheets para gestionar la lista de invitados y el registro de asistencia.

## Características Principales

- **Confirmación de Asistencia**: Los invitados pueden ingresar su número de documento para verificar si están en la lista de invitados.
- **Generación de Tickets QR**: Una vez confirmada la asistencia, se genera un ticket con un código QR encriptado.
- **Registro de Ingreso**: Al escanear el QR, se registra la asistencia en la ubicación correspondiente (iglesia, bodega, etc.).
- **Interfaz Responsiva**: Diseñada con Tailwind CSS para una experiencia óptima en dispositivos móviles y de escritorio.
- **Cifrado de Datos**: Utiliza cifrado César para proteger la información en los códigos QR.
- **Integración con Google Sheets**: Backend en Apps Script para consultar y actualizar datos en tiempo real.

## Estructura del Proyecto

```
reencuentro_registro/
├── index.html          # Página principal de confirmación de asistencia
├── index.js            # Lógica JavaScript para la página principal
├── estilos.css         # Estilos CSS adicionales
├── fonts.css           # Configuración de fuentes
├── README.md           # Este archivo
├── images/             # Imágenes del proyecto (logos, fondos, etc.)
├── ingreso/            # Página de registro de ingreso
│   ├── index.html
│   ├── ingreso.css
│   └── ingreso.js
├── utilidades/         # Módulos de utilidades
│   ├── config.js       # Configuraciones globales
│   ├── uiManager.js    # Gestión de la interfaz de usuario
│   └── utilidades.js   # Funciones auxiliares (cifrado, descarga)
└── AppScript/          # Código del backend en Google Apps Script
    └── codigo.gs
```

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Backend**: Google Apps Script
- **Base de Datos**: Google Sheets
- **Librerías**: QRCode.js para generación de códigos QR
- **Fuentes**: Montserrat de Google Fonts

## Configuración y Despliegue

### Prerrequisitos

- Cuenta de Google con acceso a Google Sheets y Apps Script
- Hoja de cálculo de Google Sheets con la lista de invitados
- Editor de código (VS Code recomendado)

### Configuración del Backend

1. Crear una hoja de cálculo de Google Sheets con las siguientes hojas:
   - `LIDERES Y NEHEMIAS`: Lista principal de invitados
   - `UDLV`: Opcional, para otros grupos
   - `OTROS`: Opcional, para categorías adicionales

2. Desplegar el script en `AppScript/codigo.gs` como una aplicación web:
   - Abrir Apps Script en Google
   - Pegar el código de `codigo.gs`
   - Configurar el ID de la hoja de cálculo en `SPREADSHEET_ID`
   - Desplegar como aplicación web y obtener la URL

3. Actualizar las URLs en `utilidades/config.js`:
   - `URL_APP`: URL del script desplegado
   - `FECHA_EVENTO`: Fecha del evento

### Configuración del Frontend

1. Actualizar las URLs base en `index.js`:
   - `URL_BASE`: URL donde se hospeda la aplicación
   - `URL_APP`: URL del backend (igual que en config.js)

2. Colocar las imágenes en la carpeta `images/`:
   - `logo_white.png`: Logo de MCIM
   - `titulo.png`: Título del evento
   - `evento.jpeg`: Imagen de fondo
   - `wall.webp`: Fondo para la página de ingreso
   - `icono.png`: Ícono del sitio

### Despliegue

El proyecto puede desplegarse en cualquier servidor web estático o plataforma como GitHub Pages, Netlify, etc.

## Uso

1. **Confirmación de Asistencia**:
   - El invitado ingresa su número de documento en la página principal
   - Si está en la lista, se genera un ticket con QR
   - El ticket puede descargarse como imagen PNG

2. **Registro de Ingreso**:
   - Al escanear el QR, se redirige a la página de ingreso
   - Se selecciona la ubicación (iglesia)
   - Se verifica la asistencia y se registra en Google Sheets

## Funcionalidades Técnicas

- **Cifrado**: Los IDs se cifran con César antes de incluirse en el QR
- **Verificación**: Consulta en tiempo real a Google Sheets
- **Prevención de Duplicados**: Verifica si ya se registró asistencia
- **Manejo de Errores**: Mensajes informativos para casos no encontrados
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla

## Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crear una rama para la nueva funcionalidad
3. Realizar los cambios
4. Probar exhaustivamente
5. Enviar un pull request

## Licencia

Este proyecto es propiedad de MCIM y está destinado únicamente para uso interno del evento "Reencuentro 2026".

## Contacto

Para preguntas o soporte técnico, contactar al equipo de desarrollo de MCIM.
