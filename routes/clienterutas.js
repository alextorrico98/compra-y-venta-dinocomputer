const express=require('express');
const rutas=express.Router();
const clienteModel=require('../models/Cliente');

//endpoit traer todas los productos

rutas.get('/traercliente', async (req,res)=>{
    try{
       const cliente= await clienteModel.find({});
       res.json(cliente);
    }
    catch(error)
    {
        res.status(500).json({mensaje: error.mensaje});
    }
});
//ENDO POINT CREAR
rutas.post('/crear',async (req,res)=>{
    const cliente=new clienteModel({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        telefono:req.body.telefono,
        email:req.body.email
    })
    try{
        const nuevoCliente=await cliente.save();
        res.status(201).json(nuevoCliente);
    }
    catch(error)
    {
        res.status(400).json({mensaje:error.message})
    }

});
//endpoint 3 editar
rutas.put('/editar/:id',async (req,res)=>{
    try
    {
        const clienteEditar= await clienteModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if(!clienteEditar)
            return res.status(404).json({mensaje: 'cliente no encontrado XD'});
            else
            return res.json(clienteEditar);
        
    }
    catch(error)
    {
        res.status(400).json({mensaje:error.message})
    }
});
//eliminar
rutas.delete('/eliminar/:id',async (req,res)=>{
try
{
    const eliminarCliente=await clienteModel.findByIdAndDelete(req.params.id);
    if(!eliminarCliente)
    return res.status(404).json({mensaje:'cliente no encontrada XD'})
    else
    return res.json({mensaje:'cliente eliminado'})
    
}
catch(error)
    {
        res.status(500).json({mensaje:error.message})
    }
});
module.exports=rutas;