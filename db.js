import { Sequelize, Model, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,     
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:  process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    });

    export { sequelize, Model, DataTypes }

    //Función para conectar a la base de datos
    export const conectarBasedeDatos = async () =>{
       await sequelize.authenticate()
     .then(() => console.log('Conexión a base de datos exitosa'))
     .catch((error) => console.log('Error al conectar a base de datos', error));
    };
