import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});

const stringbaseDeDatos = process.env.DATABASE_URL;

const client = new MongoClient(stringbaseDeDatos,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos;

const conectarDB = (callback) => {
    client.connect((err, db) => {
        if(err) {
            console.error('Error conectando a la BD')
        }
        baseDeDatos = db.db('LoVendo')
        return callback();
       
    });
};

const getDB = () => {
    return baseDeDatos;
}

export {conectarDB, getDB};