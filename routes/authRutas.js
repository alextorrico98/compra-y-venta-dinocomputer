const express=require('express');
const rutas=express.Router();
const Usuario=require('../models/Usuarios');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//registro
rutas.post('/registro', async (req, res) => {
    try {
        const {user,correo,contra } = req.body;
        const usuario = new Usuario({user,correo,contra});
        await usuario.save();
        res.status(201).json({mensaje: 'Usuario registrado'});
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
});

//Inicio de sesion
rutas.post('/iniciarsesion', async (req,res) => {
    try {
        const { correo, contra } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario)
            return res.status(401).json({ error : 'Correo invalido!!!!!'});
        const validarContrasena = await usuario.compararContrasenia(contra);
        if (!validarContrasena)
            return res.status(401).json({ error : 'Contrasenia invalido!!!!!'});
        //creacion de token 
        const token = jwt.sign({ usuarioId: usuario._id },'clave_secreta', {expiresIn: '2h'});
        usuario.token = token;
        await usuario.save();
        res.json( {token});
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
    
});
// Cerrar sesión
rutas.post('/cerrarsesion', async (req, res) => {
    try {
        const { token } = req.body;
        if (!token)
            return res.status(400).json({ mensaje: 'Token requerido' });

        const decoded = jwt.verify(token, 'clave_secreta');
        const usuario = await Usuario.findById(decoded.usuarioId);
        if (!usuario)
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });

        // Eliminar el token
        usuario.token = null;
        await usuario.save();
        res.json({ mensaje: 'Sesión cerrada' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
module.exports = rutas;