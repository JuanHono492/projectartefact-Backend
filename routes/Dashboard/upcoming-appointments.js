// Próximas citas
router.get('/upcoming-appointments', async (req, res) => {
    try {
        const citas = await Cita.findAll({
            where: {
                fecha: new Date().toISOString().split('T')[0]
            },
            order: [['hora', 'ASC']],
            limit: 5,
            include: [
                { model: Paciente, attributes: ['nombre', 'apellido'] },
                { model: Usuario, as: 'Medico', attributes: ['nombreUsuario'] }
            ]
        });

        res.json(citas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las próximas citas' });
    }
});
