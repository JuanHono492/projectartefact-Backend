// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Conexión a la base de datos principal
const sequelizeAuth = require('./config/BDAuth'); // Conexión a la base de datos de autenticación

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000', // URL del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Importar modelos
const Usuario = require('./models/Usuario');
const Cita = require('./models/Cita');
const Paciente = require('./models/Paciente');
const HistoriaClinica = require('./models/HistoriaClinica');

// Definir relaciones
Usuario.hasMany(Cita, { as: 'Citas', foreignKey: 'DoctorID' });
Cita.belongsTo(Usuario, { as: 'Doctor', foreignKey: 'DoctorID' });

Paciente.hasMany(Cita, { as: 'CitasPaciente', foreignKey: 'PacienteID' });
Cita.belongsTo(Paciente, { as: 'PacienteCita', foreignKey: 'PacienteID' });

Paciente.hasMany(HistoriaClinica, { as: 'HistoriasPaciente', foreignKey: 'PacienteID' });
HistoriaClinica.belongsTo(Paciente, { as: 'PacienteHistoria', foreignKey: 'PacienteID' });

Usuario.hasMany(HistoriaClinica, { as: 'HistoriasMedico', foreignKey: 'DoctorID' });
HistoriaClinica.belongsTo(Usuario, { as: 'MedicoHistoria', foreignKey: 'DoctorID' });

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/usuarios');
const historiasClinicasRoute = require('./routes/historiaclinica');
const citasRoutes = require('./routes/citas'); 
const reportesRoute = require('./routes/reportes');


// Usar rutas
app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/api', historiasClinicasRoute);
app.use('/citas', citasRoutes); 
app.use('/reportes', reportesRoute);

// Sincronizar con ambas bases de datos
async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelizeAuth.authenticate();
        console.log('Conexión a ambas bases de datos exitosa');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar con las bases de datos:', error);
    }
}

startServer();
