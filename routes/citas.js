// routes/citas.js
const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');
const Paciente = require('../models/Paciente');
const Usuario = require('../models/Usuario');

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.findAll({
            include: [
                { model: Paciente, attributes: ['Nombre', 'Apellido', 'DNI'] },
                { model: Usuario, as: 'Doctor', attributes: ['Nombre', 'Apellido'] }
            ]
        });
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener citas' });
    }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
    try {
        const nuevaCita = await Cita.create(req.body);
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la cita' });
    }
});

// Obtener una cita por ID
router.get('/:id', async (req, res) => {
    try {
        const cita = await Cita.findByPk(req.params.id, {
            include: [
                { model: Paciente, attributes: ['Nombre', 'Apellido', 'DNI'] },
                { model: Usuario, as: 'Doctor', attributes: ['Nombre', 'Apellido'] }
            ]
        });
        if (cita) res.json(cita);
        else res.status(404).json({ error: 'Cita no encontrada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la cita' });
    }
});

// Actualizar una cita por ID
router.put('/:id', async (req, res) => {
    try {
        const cita = await Cita.findByPk(req.params.id);
        if (cita) {
            await cita.update(req.body);
            res.json(cita);
        } else res.status(404).json({ error: 'Cita no encontrada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cita' });
    }
});

// Cambiar el estado de una cita en lugar de eliminarla
router.delete('/:id', async (req, res) => {
    try {
        const cita = await Cita.findByPk(req.params.id);
        if (cita) {
            await cita.update({ Estado: 'Cancelada' });
            res.json({ message: 'Cita cancelada' });
        } else res.status(404).json({ error: 'Cita no encontrada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar el estado de la cita' });
    }
});

module.exports = router;
