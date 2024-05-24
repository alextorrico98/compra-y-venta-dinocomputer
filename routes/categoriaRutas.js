const express=require('express');
const rutas=express.Router();
const categoriaModel=require('../models/Categoria');

//endpoit traer todas las categorias

rutas.get('/traercategorias', async (req,res)=>{
    try{
       const categoria= await categoriaModel.find({});
       res.json(categoria);
    }
    catch(error)
    {
        res.status(500).json({mensaje: error.mensaje});
    }
});
//ENDO POINT CREAR
rutas.post('/crear',async (req,res)=>{
    const categoria=new categoriaModel({
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
    })
    try{
        const nuevaCategoria=await categoria.save();
        res.status(201).json(nuevaCategoria);
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
        const categoriaEditar= await categoriaModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if(!categoriaEditar)
            return res.status(404).json({mensaje: 'categoria no encontrada XD'});
            else
            return res.json(categoriaEditar);
        
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
    const eliminarcategoria=await categoriaModel.findByIdAndDelete(req.params.id);
    if(!eliminarcategoria)
    return res.status(404).json({mensaje:'categoria no encontrada XD'})
    else
    return res.json({mensaje:'categoria eliminado'})
    
}
catch(error)
    {
        res.status(500).json({mensaje:error.message})
    }
});
module.exports=rutas;