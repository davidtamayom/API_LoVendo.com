import Express from 'express';
import {queryTodasVentas, crearVenta, editarVenta, eliminarVenta} from '../../controllers/ventas/controller.js';

const rutasVentas= Express.Router();

const genericCallback = (res) => (err, result) => {
    if(err) {
        res.status(500).send('Error consultado Productos')
    } else {
        res.json(result);
    };
};

rutasVentas.route("/ventas").get((req, res) => {
    console.log('LLamaron GET en /productos')
    queryTodasVentas(genericCallback(res))
});

rutasVentas.route("/ventas").post((req, res) => {
    crearVenta(req.body, genericCallback(res))
});

rutasVentas.route("/ventas/:id").delete((req,res) => {
    eliminarVenta(req.params.id, genericCallback(res))
})

rutasVentas.route("/ventas/:id").patch((req,res) =>{
    editarVenta(req.params.id, req.body, genericCallback(res))
});


export default rutasVentas;