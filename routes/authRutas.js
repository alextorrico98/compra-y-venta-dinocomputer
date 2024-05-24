const express=require('express');
const rutas=express.Router();
const usuarioModel=require('../models/Usuarios');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
///mostrar usuario
rutas.get('/traerusuario', async (req,res)=>{
    try{
       const usuario= await usuarioModel.find({});
       res.json(usuario);
    }
    catch(error)
    {
        res.status(500).json({mensaje: error.mensaje});
    }
});
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
      const { usuarioId } = req.body;
      const usuario = await Usuario.findById(usuarioId);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      usuario.token = null;
      await usuario.save();
      res.json({ mensaje: 'Sesión cerrada correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  });
module.exports = rutas;