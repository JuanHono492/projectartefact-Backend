require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Conexión a la base de datos principal
const sequelizeAuth = require('./config/BDAuth'); // Conexión a la base de datos de autenticación
const getJsreportInstance = require('./config/jsreport');

const app = express();
let jsreportReady = false; // Bandera para saber si jsreport está listo

// Configuración
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Configuración de CORS
app.use(
    cors({
        origin: FRONTEND_URL, // URL del frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Middleware para manejar datos JSON
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

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal en el servidor' });
});

// Función para conectar a las bases de datos
async function connectDatabases() {
    try {
        console.log('Intentando conectar con las bases de datos...');
        await sequelize.authenticate();
        console.log('Conexión a la base de datos principal exitosa');

        await sequelizeAuth.authenticate();
        console.log('Conexión a la base de datos de autenticación exitosa');
    } catch (error) {
        console.error('Error al conectar con las bases de datos:', error);
        process.exit(1); // Finaliza el proceso si no puede conectarse
    }
}

// Función para inicializar `jsreport` de manera asíncrona
async function initializeJsreport() {
    try {
        const jsreport = await getJsreportInstance();
        jsreportReady = true; // Marca jsreport como listo
        console.log('jsreport inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar jsreport:', error);
        process.exit(1); // Finaliza el proceso si no puede inicializar jsreport
    }
}

// Middleware para verificar que `jsreport` esté listo
app.use((req, res, next) => {
    if (!jsreportReady && req.path.startsWith('/reportes')) {
        return res.status(503).json({ error: 'El servicio de reportes está inicializándose. Intenta nuevamente en unos momentos.' });
    }
    next();
});

// Función para iniciar el servidor
async function startServer() {
    try {
        await connectDatabases(); // Conectar a las bases de datos

        // Inicializar jsreport de manera asíncrona (no bloquea el servidor)
        initializeJsreport();

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// Iniciar el servidor
startServer();
