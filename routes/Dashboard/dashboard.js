// routes/dashboard.js
const express = require('express');
const Paciente = require('../../models/Paciente');
const Cita = require('../../models/Cita');
const Usuario = require('../../models/Usuario');
const Receta = require('../../models/Receta');
const router = express.Router();

// Ruta para obtener las estadísticas clave
router.get('/stats', async (req, res) => {
    try {
        const totalPacientes = await Paciente.count();
        const citasHoy = await Cita.count({
            where: {
                fecha: new Date().toISOString().split('T')[0] // Fecha de hoy
            }
        });
        const citasPendientes = await Cita.count({ where: { estado: 'Pendiente' } });
        const medicosActivos = await Usuario.count({ where: { rol: 'Medico' } });
        const recetasEmitidas = await Receta.count({
            where: {
                fechaEmision: { $gte: new Date(new Date().setDate(1)) } // Este mes
            }
        });

        res.json({
            pacientes: totalPacientes,
            citasHoy,
            citasPendientes,
            medicosActivos,
            recetasEmitidas,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las estadísticas' });
    }
});

module.exports = router;
