const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente', {
    PacienteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DNI: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    FechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    Genero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    EstadoCivil: {
        type: DataTypes.STRING,
        allowNull: true
    },
    TipoSangre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Ocupacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Direccion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CorreoElectronico: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FechaRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'Pacientes',
    timestamps: false
});

module.exports = Paciente;
