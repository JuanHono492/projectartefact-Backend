const express = require('express');
const router = express.Router();
const jsreport = require('../config/jsreport'); // Importa la configuración de jsreport

router.post('/generate', async (req, res) => {
    const { template, data } = req.body;

    console.log('Datos recibidos para el reporte:', JSON.stringify({ template, data }, null, 2)); // Imprime el contenido de `data` en JSON legible

    try {
        const jsreportInstance = await jsreport(); // Inicializa jsreport si aún no lo está

        // Si `Cita` es un array, convierte el primer objeto a un formato legible
        if (Array.isArray(data.Cita) && data.Cita.length > 0) {
            data.Cita = JSON.parse(JSON.stringify(data.Cita[0])); // Convierte el primer objeto del array a JSON plano
        } else {
            // Si no hay datos de cita, asigna valores predeterminados
            data.Cita = {
                FechaCita: 'N/A',
                HoraCita: 'N/A',
                MotivoCita: 'No especificado',
                Estado: 'No especificado',
                DescripcionCita: 'No disponible'
            };
        }

        console.log('Datos procesados para el reporte:', JSON.stringify(data, null, 2)); // Muestra los datos procesados

        // Renderiza el reporte
        const report = await jsreportInstance.render({
            template: {
                content: template,
                engine: 'handlebars',
                recipe: 'chrome-pdf', // Genera el reporte como PDF usando Chrome
            },
            data, // Datos para renderizar el reporte
        });

        // Configura la respuesta
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Reporte.pdf"',
        });

        // Envía el reporte al cliente
        report.stream.pipe(res);
    } catch (error) {
        console.error('Error al generar el reporte:', error.message);
        res.status(500).json({ error: 'Error al generar el reporte' });
    }
});

module.exports = router;
