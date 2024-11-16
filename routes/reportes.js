const express = require('express');
const getJsreportInstance = require('../config/jsreport');

const router = express.Router();

router.post('/generate', async (req, res) => {
    const { template, data } = req.body; // Datos enviados desde el frontend

    try {
        const jsreport = await getJsreportInstance(); // Inicializar jsreport

        // Validar datos dinámicos (preprocesamiento)
        const cita = data?.Citas?.[0] || {
            FechaCita: 'N/A',
            HoraCita: 'N/A',
            MotivoCita: 'No especificado',
            Estado: 'No especificado',
            DescripcionCita: 'No disponible',
        };
        data.Cita = cita;

        // Renderizar el reporte
        const report = await jsreport.render({
            template: {
                content: template, // Template recibido
                engine: 'handlebars', // Motor de plantillas
                recipe: 'chrome-pdf', // Tipo de archivo generado
            },
            data, // Datos enviados para el reporte
        });

        // Configuración para enviar el PDF
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Reporte.pdf"',
        });

        // Enviar el PDF al cliente
        report.stream.pipe(res);
    } catch (error) {
        console.error('Error al generar el reporte:', error.message);
        res.status(500).json({ error: 'Error al generar el reporte', details: error.message });
    }
});

module.exports = router;
