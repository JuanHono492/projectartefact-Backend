const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente', {
    PacienteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: DataTypes.STRING,
    Apellido: DataTypes.STRING,
    DNI: DataTypes.STRING,
    FechaNacimiento: DataTypes.DATE,
    Genero: DataTypes.STRING,
    EstadoCivil: DataTypes.STRING,
    TipoSangre: DataTypes.STRING,
    Ocupacion: DataTypes.STRING,
    Direccion: DataTypes.STRING,
    Telefono: DataTypes.STRING,
    CorreoElectronico: DataTypes.STRING,
    FechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Pacientes',
    timestamps: false,
});

module.exports = Paciente;
