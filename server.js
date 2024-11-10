// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Conexión a la base de datos principal
const sequelizeAuth = require('./config/BDAuth'); // Conexión a la base de datos de autenticación


const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend si es diferente
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/usuarios');
const historiasClinicasRoute = require('./routes/historiaclinica');


// Usar rutas
app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/api', historiasClinicasRoute);

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
