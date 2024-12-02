const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');
const Paciente = require('../models/Paciente');
const Usuario = require('../models/Usuario');

// Obtener todas las citas
// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.findAll({
            include: [
                { 
                    model: Paciente,  // Relación con Paciente sin alias
                    attributes: ['Nombre', 'Apellido', 'DNI']
                },
                { 
                    model: Usuario,   // Relación con Usuario (Doctor) usando el alias
                    as: 'Doctor',     // El alias 'Doctor' que definimos en la relación
                    attributes: ['Nombre', 'Apellido']
                }
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
    const { PacienteID, DoctorID, FechaCita, HoraCita, MotivoCita, Estado, DescripcionCita } = req.body;
 
    // Verifica que todos los campos necesarios están presentes
    if (!PacienteID || !DoctorID || !FechaCita || !HoraCita || !MotivoCita || !Estado || !DescripcionCita) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear la cita' });
    }
 
    try {
        const nuevaCita = await Cita.create({
            PacienteID,
            DoctorID,
            FechaCita,
            HoraCita,
            MotivoCita,
            Estado,
            DescripcionCita
        });
 
        res.status(201).json({
            message: 'Cita creada exitosamente',
            cita: nuevaCita
        });
    } catch (error) {
        console.error("Error al crear cita:", error);
 
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Ya existe una cita con este paciente y doctor en esa fecha y hora' });
        }
 
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
