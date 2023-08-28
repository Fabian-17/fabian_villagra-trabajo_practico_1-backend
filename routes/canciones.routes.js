import { Router } from "express";
import { obtenerCancion,
obtenerCanciones,
crearCancion } from "../controller/canciones.controller";

const route = Router();

route.get('/obtenerCancion', obtenerCanciones);
route.get('/obtenerCancion/:id', obtenerCancion);

route.post('/crearCancion', crearCancion);

export {route}

