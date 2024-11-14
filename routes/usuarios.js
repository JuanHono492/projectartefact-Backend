// routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Verifica esta importación
const Authentication = require('../models/Authentication'); // Verifica esta importación
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: 'Hubo un problema al obtener los usuarios' });
    }
});

// Obtener un usuario por ID (basado en UsuarioID)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findOne({ where: { UsuarioID: id } });
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ error: 'Hubo un problema al obtener el usuario' });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, apellido, dni, nombreUsuario, rol, correoElectronico, telefono, estado, contrasena } = req.body;

    try {
        // Verificar si el nombre de usuario o DNI ya existen
        const usuarioExistente = await Usuario.findOne({ where: { NombreUsuario: nombreUsuario } });
        const dniExistente = await Usuario.findOne({ where: { DNI: dni } });

        if (usuarioExistente) {
            return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
        }

        if (dniExistente) {
            return res.status(400).json({ error: 'El DNI ya está registrado.' });
        }

        // Crear el usuario en la tabla Usuarios
        const nuevoUsuario = await Usuario.create({
            Nombre: nombre,
            Apellido: apellido,
            DNI: dni,
            NombreUsuario: nombreUsuario,
            Rol: rol,
            CorreoElectronico: correoElectronico,
            Telefono: telefono,
            Estado: estado
        });

        // Generar el hash de UsuarioID
        const usuarioIDHash = crypto.createHash('sha256').update(nuevoUsuario.UsuarioID.toString()).digest('hex');

        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(contrasena, 10);

        // Formatear la fecha de creación para que sea compatible con SQL Server
        const fechaCreacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Guardar los datos de autenticación en la tabla Authentication
        await Authentication.create({
            UsuarioIDHash: usuarioIDHash,
            PasswordHash: passwordHash,
            FechaCreacion: fechaCreacion,
            Estado: 'Activo'
        });
        

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: 'Hubo un problema al crear el usuario' });
    }
});


// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findOne({ where: { UsuarioID: id } });
        if (usuario) {
            await usuario.update(req.body);
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: 'Hubo un problema al actualizar el usuario' });
    }
});

// Cambiar estado en lugar de eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findOne({ where: { UsuarioID: id } });
        if (usuario) {
            await usuario.update({ Estado: false });
            res.json({ message: 'Usuario inactivado' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error("Error al cambiar el estado del usuario:", error);
        res.status(500).json({ error: 'Hubo un problema al cambiar el estado del usuario' });
    }
});

module.exports = router;
