import { Router } from "express";
import {obtenerPlaylists,
     obtenerPlaylist,
       crearPlaylist,
       actualizarPlaylist, 
        eliminarPlaylist} from "../controller/playlist.controller.js";

const PlaylistRoutes = Router();

// Obtener todas las playlists
PlaylistRoutes.get('/', obtenerPlaylists);

//Obtener una playlist
PlaylistRoutes.get('/:id', obtenerPlaylist);
 
// Crear una playlist
PlaylistRoutes.post('/', crearPlaylist);
 
// Actualizar una playlist
PlaylistRoutes.put('/:id', actualizarPlaylist);
 
// Eliminar una playlist
PlaylistRoutes.delete('/:id', eliminarPlaylist);

export {PlaylistRoutes}