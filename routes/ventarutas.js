const express=require('express');
const rutas=express.Router();
const ventaModel=require('../models/ventas');
const productoModel=require('../models/Producto');
const categoriaModel=require('../models/Categoria');
const clienteModel=require('../models/Cliente');

//ENDO POINT CREAR
// Ruta para registrar una venta
rutas.post('/crear',async (req,res)=>{
  const venta=new ventaModel({
      idcliente:req.body.idcliente,
      idproducto:req.body.idproducto,
      cantidad:req.body.cantidad,
  })
  try{
      const nuevaVenta=await venta.save();
      res.status(201).json(nuevaVenta);
  }
  catch(error)
  {
      res.status(400).json({mensaje:error.message})
  }

});
//reporte
rutas.get('/reporte/:idCliente', async (req, res) => {
  try {
    const ventasCliente = await ventaModel.find({ idcliente: req.params.idCliente });
    const reporteVentas = [];

    for (const venta of ventasCliente) {
      const producto = await productoModel.findById(venta.idproducto);
      const categoria = await categoriaModel.findById(producto.idcategoria);
      const cliente = await clienteModel.findById(venta.idcliente);
      const precioTotal = producto.precio * venta.cantidad;
      reporteVentas.push({
        producto: producto.nombre,
        categoria: categoria.nombre, // Suponiendo que la categoría tiene un campo 'nombre'
        precioTotal: precioTotal,
        cantidad: venta.cantidad,
        cliente: {
          nombre: cliente.nombre,
          apellido: cliente.apellido, // Suponiendo que el cliente tiene un campo 'apellido'
        },
      });
    }

    res.status(200).json(reporteVentas);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});
module.exports=rutas; 