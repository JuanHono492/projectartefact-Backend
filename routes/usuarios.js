const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Conexión principal a la base de datos

// Definición del modelo Usuario
const Usuario = sequelize.define('Usuario', {
    UsuarioID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    DoctorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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
    CorreoElectronico: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    Telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UltimoAcceso: {
        type: DataTypes.DATE
    },
    FechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Usuarios', // Nombre de la tabla en la base de datos
    timestamps: false,      // Desactiva createdAt y updatedAt si no son necesarios
});

// Sincronización con la base de datos (opcional)
// Usuario.sync({ alter: true });

module.exports = Usuario;
