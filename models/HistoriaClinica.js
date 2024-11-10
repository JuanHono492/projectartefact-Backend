const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HistoriaClinica = sequelize.define('HistoriaClinica', {
    HistoriaClinicaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PacienteID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Diagnostico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tratamiento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FechaConsulta: {  // Nombre correcto de la columna en la base de datos
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'HistoriasClinicas',
    timestamps: false
});

module.exports = HistoriaClinica;
