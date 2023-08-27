import { Router } from "express";
import {obtenerPlaylists,
     obtenerPlaylist,
       crearPlaylist,
       actualizarPlaylist, 
        eliminarPlaylist} from "../controller/playlist.controller.js";

const routes = Router();

// Obtener todas las playlists
routes.get('/obtenerPlaylist/', obtenerPlaylists);

//Obtener una playlist
routes.get('/obtenerPlaylist/:id', obtenerPlaylist);
 
// Crear una playlist
routes.post('/crearPlaylist/', crearPlaylist);
 
// Actualizar una playlist
routes.put('/obtenerPlaylist/:id', actualizarPlaylist);
 
// Eliminar una playlist
routes.delete('/obtenerPlaylist/:id', eliminarPlaylist);

export {routes}