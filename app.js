// Importaciones de las dependencias
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes/usuario.routes.js';
import { routes } from './routes/playlist.routes.js';
import { route } from './routes/canciones.routes.js';
import dotenv from 'dotenv';
dotenv.config();

// Instancia de conexión a la base de datos
import {conectarBasedeDatos} from './db.js';
conectarBasedeDatos()

// puerto donde será escuchado el servidor
const port = process.env.PORT || 3000


const app = express();



// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json())

app.use('/usuario', router);
app.use('/playlist', routes);
app.use('/canciones', route);

// Starting the server
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));