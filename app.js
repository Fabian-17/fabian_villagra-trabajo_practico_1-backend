// Importaciones de las dependencias
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

// Instancia de conexión a la base de datos
import sequelize from './db.js';

 sequelize.sequelize.authenticate()
     .then(() => console.log('Conexión a base de datos exitosa'))
     .catch((error) => console.log('Error al conectar a base de datos', error));


// puerto donde será escuchado el servidor
const port = process.env.PORT || 3000


const app = express();

app.post('/',
  body('email').notEmpty().isEmail(),
  body('password').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return res.json(req.body);
    }
    console.log(req.body);
    res.status(400).json(errors.array());
  });

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json())


// Starting the server
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));