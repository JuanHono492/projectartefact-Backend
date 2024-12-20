const express = require('express');
const router = express.Router();
const HistoriaClinica = require('../models/HistoriaClinica');
const Paciente = require('../models/Paciente');
const Usuario = require('../models/Usuario');
const Cita = require('../models/Cita');

// Obtener el historial médico con la información del paciente, médico y citas
router.get('/', async (req, res) => {
    try {
        const historias = await HistoriaClinica.findAll({
            include: [
                {
                    model: Paciente,
                    attributes: ['Nombre', 'Apellido', 'DNI', 'Genero', 'TipoSangre']
                },
                {
                    model: Usuario,
                    as: 'Medico',
                    attributes: ['Nombre', 'Apellido']
                },
                {
                    model: Cita,
                    as: 'Citas', // Alias utilizado en el modelo
                    attributes: ['FechaCita', 'HoraCita', 'MotivoCita', 'Estado', 'DescripcionCita']
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
