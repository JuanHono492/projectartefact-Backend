const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');
const Paciente = require('../models/Paciente');
const Doctor = require('../models/Doctor'); // Assuming there's a Doctor model

// Get all doctors for selection
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ error: 'Error fetching doctors' });
    }
});

// Check if a patient exists or create a new one
router.post('/patients', async (req, res) => {
    const { nombre, apellido, dni, ...otherDetails } = req.body;

    try {
        let patient = await Paciente.findOne({ where: { DNI: dni } });
        if (!patient) {
            patient = await Paciente.create({ Nombre: nombre, Apellido: apellido, DNI: dni, ...otherDetails });
        }
        res.json(patient);
    } catch (error) {
        console.error("Error managing patient:", error);
        res.status(500).json({ error: 'Error managing patient' });
    }
});

// Schedule an appointment
router.post('/citas', async (req, res) => {
    const { pacienteID, doctorID, fechaCita, horaCita, motivoCita, estado, numeroHistoriaClinica } = req.body;

    try {
        const cita = await Cita.create({
            PacienteID: pacienteID,
            DoctorID: doctorID,
            FechaCita: fechaCita,
            HoraCita: horaCita,
            MotivoCita: motivoCita,
            Estado: estado,
            NumeroHistoriaClinica: numeroHistoriaClinica
        });
        res.status(201).json({ message: 'Cita creada exitosamente', cita });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ error: 'Error creating appointment' });
    }
});

module.exports = router;
