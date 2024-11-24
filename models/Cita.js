const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

// Definición del modelo Cita
const Cita = sequelize.define('Cita', {
    CitaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PacienteID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DoctorID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FechaCita: {
        type: DataTypes.DATE,
        allowNull: false
    },
    HoraCita: {
        type: DataTypes.TIME,
        allowNull: false
    },
    MotivoCita: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DescripcionCita: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Citas',
    timestamps: false
});

// Exportar el modelo sin relaciones (para evitar dependencias circulares en esta etapa)
module.exports = Cita;
