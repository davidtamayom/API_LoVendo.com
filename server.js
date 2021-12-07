import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import {conectarDB} from './db/db.js';
import rutasProductos from './views/productos/rutas.js';
import rutasVentas from './views/ventas/rutas.js';
import rutasUsuarios from './views/usuarios/rutas.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import autorizacionEstadoUsuario from './middleware/autorizacionEstadoUsuario.js';

dotenv.config({path:'./.env'});

const app = Express();

app.use(Express.json())
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://lovendocom.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-lovendo',
  issuer: 'https://lovendocom.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(autorizacionEstadoUsuario);

app.use(rutasProductos);
app.use(rutasVentas);
app.use(rutasUsuarios);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarDB(main);