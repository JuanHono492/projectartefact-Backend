const express = require('express');
const router = express.Router();
const HistoriaClinica = require('../models/HistoriaClinica');

// Ruta para obtener todas las historias clínicas
router.get('/historias', async (req, res) => {
    try {
        const historias = await HistoriaClinica.findAll();
        res.json(historias); // Enviar datos en formato JSON
    } catch (error) {
        console.error("Error al obtener historias clínicas:", error);
        res.status(500).json({ error: 'Hubo un problema al obtener las historias clínicas' });
    }
});

module.exports = router;
