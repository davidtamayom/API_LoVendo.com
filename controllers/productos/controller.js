import {getDB} from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryTodosProductos = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').find().limit(50).toArray(callback)
};

const crearProducto = async (datosProducto, callback) => {
        if(
            Object.keys(datosProducto).includes('descripcion') &&
            Object.keys(datosProducto).includes('precio') &&
            Object.keys(datosProducto).includes('estado')
        ) {
            const baseDeDatos = getDB();
            await baseDeDatos.collection('producto').insertOne(datosProducto, callback); 
        } else {
            return 'Error';
        }
};

const editarProducto = async (id, edicion, callback) => {
    const filtroProducto = {_id: new ObjectId(id)}
    const operacion = {
        $set:edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('producto')
    .findOneAndUpdate(filtroProducto, operacion, {upsert:true, returnOriginal: true}, callback);
};

const eliminarProducto = async (id, callback) => {
    const filtroProducto = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').deleteOne(filtroProducto, callback);
};

export {queryTodosProductos, crearProducto, editarProducto, eliminarProducto};