const express=require('express');
const rutas=express.Router();
const listanegra=require('../models/listanegra');
rutas.post('/cerrarsesion',async (req,res)=>{
try {
    const token=req.header.token;
    const newToken= new blacklist({})
    await newToken.save();
    return res.status(200).send({message:'user sesion deleted'})
} catch (error) {
    console.log(' ~ UserController ~ login= ~ error:', error);
    next(error);
}
});
