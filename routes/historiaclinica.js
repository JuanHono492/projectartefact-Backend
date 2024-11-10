// routes/historiaclinica.js
const express = require('express');
const router = express.Router();
const HistoriaClinica = require('../models/HistoriaClinica');
const Paciente = require('../models/Paciente');
const Usuario = require('../models/Usuario');

// Obtener el historial médico con la información del paciente y el médico
router.get('/historias', async (req, res) => {
    try {
        const historias = await HistoriaClinica.findAll({
            include: [
                {
                    model: Paciente,
                    attributes: ['Nombre', 'Apellido', 'DNI']
                },
                {
                    model: Usuario,
                    as: 'Medico', // Usa el alias definido en la asociación
                    attributes: ['Nombre', 'Apellido']
                }
            ]
        });
        res.json(historias);
    } catch (error) {
        console.error("Error al obtener historias clínicas:", error);
        res.status(500).json({ error: 'Hubo un problema al obtener las historias clínicas' });
    }
});

module.exports = router;
