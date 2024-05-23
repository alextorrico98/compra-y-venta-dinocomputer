const express = require('express');
const request = require('supertest');
const productorutas = require('../../routes/productoRutas');
const productoModel = require('../../models/Producto');
const mongoose  = require('mongoose');
const app = express();
app.use(express.json());
app.use('/producto',productorutas);

describe('Pruebas Unitarias para productos', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/DB_DinoComputer',{
            useNewUrlParser : true            
        });
        await productoModel.deleteMany({});
    });
    // al finalziar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
      });
      //1er test : GET
    test('Deberia Traer todos los productos metodo: GET: traerProductos', async() =>{
        await productoModel.create({ nombre: 'tarjeta grafica', marca: 'nvidia', descripcion: 'rtx ', cantidad: 15 });
        await productoModel.create({ nombre: 'tarjeta grafica', marca: 'radeon', descripcion: 'rx ', cantidad: 12 });
        // solicitud - request
        const res =  await request(app).get('producto/traerProductos');
        //verificar la respuesta
        expect(res.statusCode).toEqual(100);
        expect(res.body).toHaveLength(2);
    }, 10000);
});