import {getDB} from '../../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';

const queryTodosUsuarios = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').find().limit(50).toArray(callback)
};

const crearUsuario = async (datosUsuario, callback) => {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback); 
};

const consultarOCrearUsuario = async (req, callback) =>{
    const token = req.headers.authorization.split('Bearer ')[1] 
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user)

    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').findOne({email: user.email}, 
        async (err, response) => {
            if(response){
                callback(err, response);
            }else {
                user.auth0ID = user._id;
                delete user._id;
                user.rol = 'sin rol'
                user.estado = 'pendiente'
                await crearUsuario(user, (err, respuesta) => callback (err,user));
                }
        });
}; 

const editarUsuario = async (id, edicion, callback) => {
    const filtroProducto = {_id: new ObjectId(id)}
    const operacion = {
        $set:edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('usuario')
    .findOneAndUpdate(filtroProducto, operacion, {upsert:true, returnOriginal: true}, callback);
};

const eliminarUsuario = async (id, callback) => {
    const filtroProducto = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').deleteOne(filtroProducto, callback);
};

export {queryTodosUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultarOCrearUsuario};