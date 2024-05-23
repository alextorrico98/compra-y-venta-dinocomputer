const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
//definir esquema
const usuarioSchema= new mongoose.Schema({
    user:{
        type: String,
        require: true,
        unique: true
    },
    correo : {
        type: String, 
        required : true,
        unique : true
    },
    contra : {
        type: String, 
        required : true
    }
});

// hashear contrasenia
usuarioSchema.pre('save', async function (next){
    if (this.isModified('contra')){
        this.contra =  await bcrypt.hash(this.contra,10);
    }
    next();
});
//comparar contrasenias
usuarioSchema.methods.compararContrasenia = async function  ( contraseniaComparar ){
    return await bcrypt.compare(contraseniaComparar, this.contra);
};
const usuarioModel=mongoose.model('usuario',usuarioSchema,'usuario');
module.exports= usuarioModel;
