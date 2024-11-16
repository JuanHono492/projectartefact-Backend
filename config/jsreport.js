const jsreport = require('jsreport');
require('jsreport-handlebars')(jsreport);
require('jsreport-chrome-pdf')(jsreport);

async function initJsReport() {
    try {
        // Inicializa jsreport con sus configuraciones
        const instance = jsreport({
            extensions: {
                chromePdf: {
                    launchOptions: {
                        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Opciones para evitar errores en contenedores
                    },
                },
            },
        });

        // Inicializa jsreport
        await instance.init();
        console.log('JsReport inicializado exitosamente');
        return instance;
    } catch (error) {
        console.error('Error al inicializar JsReport:', error);
        throw error;
    }
}

// Exporta una instancia de JsReport lista para ser usada
module.exports = initJsReport;
