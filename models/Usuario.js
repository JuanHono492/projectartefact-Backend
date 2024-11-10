const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Usuario = sequelize.define('Usuario', {
    UsuarioID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    DoctorID: {
        type: DataTypes.INTEGER,
        unique: true,
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
        unique: true,
        allowNull: false
    },
    NombreUsuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    Rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CorreoElectronico: {
        type: DataTypes.STRING
    },
    Telefono: {
        type: DataTypes.STRING
    },
    UltimoAcceso: {
        type: DataTypes.DATE
    },
    FechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'Usuarios',
    timestamps: false
});


module.exports = Usuario;
