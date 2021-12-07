import Express from 'express';
import {queryTodosProductos, crearProducto, editarProducto, eliminarProducto} from '../../controllers/productos/controller.js';

const rutasProductos= Express.Router();

const genericCallback = (res) => (err, result) => {
    if(err) {
        res.status(500).send('Error consultado Productos')
    } else {
        res.json(result);
    };
};

rutasProductos.route("/productos").get((req, res) => {
    console.log('LLamaron GET en /productos')
    queryTodosProductos(genericCallback(res))
});

rutasProductos.route("/productos").post((req, res) => {
    crearProducto(req.body, genericCallback(res))
});

rutasProductos.route("/productos/:id").delete((req,res) => {
    eliminarProducto(req.params.id, genericCallback(res))
})

rutasProductos.route("/productos/:id").patch((req,res) =>{
    editarProducto(req.params.id, req.body, genericCallback(res))
});



export default rutasProductos;