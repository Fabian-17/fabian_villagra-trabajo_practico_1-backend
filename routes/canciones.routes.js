import { Router } from "express";
import { obtenerCancion,
obtenerCanciones,
crearCancion } from "../controller/canciones.controller.js";

const CancionesRoutes = Router();

CancionesRoutes.get('/', obtenerCanciones);
CancionesRoutes.get('/:id', obtenerCancion);

CancionesRoutes.post('/', crearCancion);

export {CancionesRoutes}

