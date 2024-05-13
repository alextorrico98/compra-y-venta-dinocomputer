const express=require('express');
const rutas=express.Router();
const productoModel=require('../models/Producto');

//endpoit traer todas los productos

rutas.get('/traerProductos', async (req,res)=>{
    try{
       const Producto= await productoModel.find({});
       res.json(Producto);
    }
    catch(error)
    {
        res.status(500).json({mensaje: error.mensaje});
    }
});
//ENDO POINT CREAR
rutas.post('/crear',async (req,res)=>{
    const producto=new productoModel({
        nombre:req.body.nombre,
        marca:req.body.marca,
        Tipo:req.body.tipo,
        descripcion:req.body.descripcion,
        cantidad:req.body.cantidad
    })
    try{
        const nuevoProducto=await producto.save();
        res.status(201).json(nuevoProducto);
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
        const productoEditar= await productoModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if(!productoEditar)
            return res.status(404).json({mensaje: 'producto no encontrada XD'});
            else
            return res.json(productoEditar);
        
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
    const eliminatProducto=await productoModel.findByIdAndDelete(req.params.id);
    if(!eliminatProducto)
    return res.status(404).json({mensaje:'reseta no encontrada XD'})
    else
    return res.json({mensaje:'producto eliminado'})
    
}
catch(error)
    {
        res.status(500).json({mensaje:error.message})
    }
});
module.exports=rutas;
//FILTRAR POR ID
