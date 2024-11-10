// models/Authentication.js
const { DataTypes } = require('sequelize');
const dbAuth = require('../config/BDAuth');

const Authentication = dbAuth.define('Authentication', {
    AuthID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UsuarioIDHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    PasswordHash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    FechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    UltimoCambio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Activo'
    }
}, {
    tableName: 'Authentication',
    timestamps: false
});

module.exports = Authentication;
