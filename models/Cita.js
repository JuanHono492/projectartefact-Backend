// models/Cita.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Paciente = require('./Paciente');

const Cita = sequelize.define('Cita', {
    CitaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PacienteID: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'PacienteID',
        },
    },
    MedicoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    FechaCita: DataTypes.DATE,
    HoraCita: DataTypes.TIME,
    MotivoCita: DataTypes.STRING,
    Estado: {
        type: DataTypes.STRING,
        defaultValue: 'Pendiente',
    },
}, {
    tableName: 'Citas',
    timestamps: false,
});

Cita.belongsTo(Paciente, { foreignKey: 'PacienteID' });
module.exports = Cita;
