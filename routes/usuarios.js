const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: 'Hubo un problema al obtener los usuarios' });
    }
});

// Obtener un usuario por ID (basado en UsuarioID)
router.get('/usuarios/:id', async (req, res) => {
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
router.post('/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: 'Hubo un problema al crear el usuario' });
    }
});

// Actualizar un usuario por ID
router.put('/usuarios/:id', async (req, res) => {
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

// Eliminar un usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findOne({ where: { UsuarioID: id } });
        if (usuario) {
            await usuario.destroy();
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ error: 'Hubo un problema al eliminar el usuario' });
    }
});

module.exports = router;
