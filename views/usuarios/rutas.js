import Express from 'express';
import {queryTodosUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultarOCrearUsuario} from '../../controllers/usuarios/controller.js';

const rutasUsuarios= Express.Router();

const genericCallback = (res) => (err, result) => {
    if(err) {
        res.status(500).send('Error consultado Productos')
    } else {
        res.json(result);
    };
};

rutasUsuarios.route("/usuarios").get((req, res) => {
    console.log('LLamaron GET en /usuarios')
    queryTodosUsuarios(genericCallback(res))
});

rutasUsuarios.route("/usuarios").post((req, res) => {
    crearUsuario(req.body, genericCallback(res))
});

rutasUsuarios.route("/usuarios/self").get((req, res) => {
    console.log('LLamaron GET en /self')
    consultarOCrearUsuario(req, genericCallback(res))
    // queryTodosUsuarios(genericCallback(res))
});

rutasUsuarios.route("/usuarios/:id").delete((req,res) => {
    eliminarUsuario(req.params.id, genericCallback(res))
})

rutasUsuarios.route("/usuarios/:id").patch((req,res) =>{
    editarUsuario(req.params.id, req.body, genericCallback(res))
});


export default rutasUsuarios;