const mongoose=require('mongoose');
//definir esquema
const ventaSchema= new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
      },
    idcliente: {
        type: String,
        required: true
      },
    idproducto: {
        type: String,
        required: true
      },
    cantidad: {
        type: Number,
        required: true
      },
    total: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
      }
});
const ventaModel=mongoose.model('venta',ventaSchema,'venta');
module.exports= ventaModel;