const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Asegúrate de importar los modelos después de la definición de Cita
let Paciente;
let Usuario;

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
        type: DataTypes.STRING(50),  // Cambiar a STRING(50) si es NVARCHAR(50)
        allowNull: true
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

// Definir las relaciones después de la definición de los modelos
Cita.associate = (models) => {
    Paciente = models.Paciente;
    Usuario = models.Usuario;

    Cita.belongsTo(Paciente, { foreignKey: 'PacienteID' }); // Relación con Paciente
    Cita.belongsTo(Usuario, { as: 'Doctor', foreignKey: 'DoctorID' }); // Relación con Usuario (Doctor)
};

// Exportar el modelo
module.exports = Cita;
