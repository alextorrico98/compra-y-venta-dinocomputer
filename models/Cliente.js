const mongoose=require('mongoose');
//definir esquema
const clienteSchema= new mongoose.Schema({
    nombre:String,
    apellido:String,
    telefono:String,
    email:String,
});
const clienteModel=mongoose.model('cliente',clienteSchema,'cliente');
module.exports= clienteModel;