//importacion de librerias
const express= require('express');
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const authRutas = require('./routes/authRutas');
const Usuario = require('./models/Usuarios');
require('dotenv').config();
const app=express();
//rutas
const productorutas= require('./routes/productoRutas');
const categoriarutas= require('./routes/categoriaRutas');
const clienterutas=require('./routes/clienterutas')
//configuracion de environment
const PORT= process.env.PORT || 3000;
const MONGO_URI=process.env.MONGO_URI;
//manejo de JSON
app.use(express.json());
// CONEXION CON MONGODB
mongoose.connect(MONGO_URI)
.then(()=>{
        console.log('conexion exitosa');
        app.listen(PORT,()=>{console.log('Servidor express corriendo en el puerto'+" "+PORT)})
    }
).catch(error=> console.log('error de conexion',error));

const autenticar = async (req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            res.status(401).json({mensaje: 'No existe el token de autenticacion'});
        const decodificar = jwt.verify(token, 'clave_secreta');
        req.usuario = await  Usuario.findById(decodificar.usuarioId);
        next();
    }
    catch(error){
        res.status(400).json({ error: error.message});
    }
};
//usar ruytas de producto
app.use('/auth', authRutas);
app.use('/producto',autenticar,productorutas);
app.use('/categoria',categoriarutas);
app.use('cliente',clienterutas);