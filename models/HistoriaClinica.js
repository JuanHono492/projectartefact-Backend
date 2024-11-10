const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Paciente = require('./Paciente');
const Usuario = require('./Usuario'); 

const HistoriaClinica = sequelize.define('HistoriaClinica', {
    HistoriaClinicaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PacienteID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Paciente,
            key: 'PacienteID'
        }
    },
    FechaConsulta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DoctorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'DoctorID' // Asegúrate de que aquí se usa `DoctorID`
        }
    },
    Diagnostico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tratamiento: {
        type: DataTypes.STRING
    },
    NotasAdicionales: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'HistoriasClinicas',
    timestamps: false
});

// Relaciones
HistoriaClinica.belongsTo(Paciente, { foreignKey: 'PacienteID', targetKey: 'PacienteID' });
HistoriaClinica.belongsTo(Usuario, { as: 'Medico', foreignKey: 'DoctorID', targetKey: 'DoctorID' }); // targetKey para asegurarse de que apunta a DoctorID en Usuario

module.exports = HistoriaClinica;
