// Importaciones de las dependencias
import { express } from 'express';
import { helmet } from 'helmet';
import { cors } from 'cors';
import { morgan } from 'morgan';


const app = express();
// puerto donde será escuchado el servidor
const port = 5000

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json())


// Starting the server
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));