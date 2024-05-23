const mongoose=require('mongoose');
//definir esquema
const productoSchema= new mongoose.Schema({
    nombre:String,
    marca:String,
    descripcion:String,
    cantidad: Number
});
const productoModel=mongoose.model('Producto',productoSchema,'Producto');
module.exports= productoModel;