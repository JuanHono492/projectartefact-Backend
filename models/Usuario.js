// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Verifica que este archivo exista y sea el correcto


const Usuario = sequelize.define('Usuario', {
    UsuarioID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    DoctorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    Nombre: DataTypes.STRING,
    Apellido: DataTypes.STRING,
    DNI: {
        type: DataTypes.STRING,
        unique: true,
    },
    NombreUsuario: {
        type: DataTypes.STRING,
        unique: true,
    },
    Rol: DataTypes.STRING,
    CorreoElectronico: DataTypes.STRING,
    Telefono: DataTypes.STRING,
    UltimoAcceso: DataTypes.DATE,
    FechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Usuarios',
    timestamps: false,
});

module.exports = Usuario;
