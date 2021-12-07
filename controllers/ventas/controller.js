import {getDB} from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryTodasVentas = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').find().limit(50).toArray(callback)
};

const crearVenta = async (datosVenta, callback) => {
            const baseDeDatos = getDB();
            await baseDeDatos.collection('venta').insertOne(datosVenta, callback); 
};

const editarVenta = async (id, edicion, callback) => {
    const filtroVenta = {_id: new ObjectId(id)}
    const operacion = {
        $set:edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('venta')
    .findOneAndUpdate(filtroVenta, operacion, {upsert:true, returnOriginal: true}, callback);
};

const eliminarVenta = async (id, callback) => {
    const filtroVenta = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').deleteOne(filtroVenta, callback);
};

export {queryTodasVentas, crearVenta, editarVenta, eliminarVenta};