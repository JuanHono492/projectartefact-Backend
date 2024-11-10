// Reportes para gráficos
router.get('/reports', async (req, res) => {
    try {
        const citasPorMes = await Cita.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('fecha')), 'mes'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'total']
            ],
            group: ['mes'],
            order: [['mes', 'ASC']]
        });

        const pacientesPorGenero = await Paciente.findAll({
            attributes: [
                'genero',
                [sequelize.fn('COUNT', sequelize.col('id')), 'total']
            ],
            group: ['genero']
        });

        res.json({ citasPorMes, pacientesPorGenero });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los reportes' });
    }
});
