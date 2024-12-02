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
                { model: Usuario, as: 'Doctor', attributes: ['Nombre', 'Apellido'] } // Alias 'Doctor' para Usuario
            ]
        });
        res.json(citas);
    } catch (error) {
        console.error("Error al obtener citas:", error);
        res.status(500).json({ error: 'Error al obtener citas' });
    }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);  // Verifica qué datos recibes
    try {
        // Verificar que el DoctorID y PacienteID existen antes de crear la cita
        const pacienteExistente = await Paciente.findByPk(req.body.PacienteID);
        const doctorExistente = await Usuario.findByPk(req.body.DoctorID);

        if (!pacienteExistente) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        if (!doctorExistente) {
            return res.status(404).json({ error: 'Doctor no encontrado' });
        }

        // Si todo es correcto, crea la nueva cita
        const nuevaCita = await Cita.create(req.body);
        res.status(201).json(nuevaCita);
    } catch (error) {
        console.error("Error al crear cita:", error);
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
