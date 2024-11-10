// routes/citas.js
const express = require('express');
const Cita = require('../models/Cita'); // Importa el modelo de Cita
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const citas = await Cita.findAll();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener citas' });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevaCita = await Cita.create(req.body);
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear cita' });
    }
});

module.exports = router;
