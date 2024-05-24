const mongoose=require('mongoose');
//definir esquema
const categoriaSchema= new mongoose.Schema({
    nombre:String,
    descripcion:String
});
const categoriaModel=mongoose.model('categoria',categoriaSchema,'categoria');
module.exports= categoriaModel;