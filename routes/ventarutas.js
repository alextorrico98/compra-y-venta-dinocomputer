const express=require('express');
const rutas=express.Router();
const ventaModel=require('../models/ventas');

//ENDO POINT CREAR
app.post('/crear', async (req, res) => {
    try {
      const { idcliente, idproducto, cantidad, preciounitario } = req.body;
      const total = cantidad * parseFloat(preciounitario);
  
      const venta = new Venta({
        idcliente,
        idproducto,
        cantidad,
        total
      });
  
      await venta.save();
      res.status(201).send(venta);
    } catch (error) {
      res.status(400).send(error);
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