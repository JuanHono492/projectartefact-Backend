// Actividad reciente
router.get('/recent-activity', async (req, res) => {
    try {
        const ultimosPacientes = await Paciente.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
        });
        const ultimasCitas = await Cita.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
            include: [
                { model: Paciente, attributes: ['nombre', 'apellido'] },
                { model: Usuario, as: 'Medico', attributes: ['nombreUsuario'] }
            ]
        });

        res.json({ ultimosPacientes, ultimasCitas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la actividad reciente' });
    }
});
