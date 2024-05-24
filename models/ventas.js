const mongoose=require('mongoose');
//definir esquema
const ventaSchema= new mongoose.Schema({
  idcliente:String,
  idproducto:String,
  cantidad:Number,  
});
const ventaModel=mongoose.model('venta',ventaSchema,'venta');
module.exports= ventaModel;