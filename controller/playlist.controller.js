import canciones from "../models/canciones.js";
import playlist from "../models/playlist.js";
import usuario from "../models/usuarios.js";

// ==========================================
//         Rutas para CRUD de playlists
// ==========================================

// Obtener todas las playlist

export const obtenerPlaylists = async (req, res) => {
    try {
        const playlists = await playlist.findAll();

        return res.json(playlists);
    } catch (error) {
        console.log('Error al obtener las playlist', error);
        return res.status(500).json({
            message: 'Error al obtener las playlist'
        })
    }
};


// Obtener una playlist

export const obtenerPlaylist = async (req, res) => {
    const { id } = req.params;

    try {
        const playlists = await playlist.findOne({
            where: {
                id
            },
            include: [{model: canciones}]
        });

        if (!playlists) {
            throw ({
                status: 404,
                message: 'No existe la playlist'
            })
        }
    
        return res.json(playlists);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
};


// Crear una playlist

export const crearPlaylist = async (req, res) => {
    const { nombre_playlist, id_usuario } = req.body;


    try {
        // Se valida que nombre_playlist no esté vacío
        if (!nombre_playlist) {
            return res.status(400).json({ message: 'El nombre de la playlist no puede estar vacío' });
        }

        // Consultar si el usuario existe
        const existeUsuario = await usuario.findByPk(id_usuario);

        if (!existeUsuario) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        // Crear una nueva instancia de playlist
        const nuevaplaylist = new playlist({
            nombre_playlist,
            id_usuario 
        });


        // Guardar en la BD
        await nuevaplaylist.save();

        return res.status(201).json({ message: 'Playlist creada con éxito', playlist: nuevaplaylist });
    } catch (error) {
        console.error('Error al crear la playlist', error);
        return res.status(500).json({ message: 'Error al crear la playlist', error: error.message });
    }
};


// Actualizar una playlist

export const actualizarPlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const play = await playlist.findByPk(id);

        console.log(play);

        if (!play) {
            return res.status(500).json(
                {
                    message:"La playlist no existe"
                })
        }

        await playlist.update(req.body, {
            where: {
                id
            }
        })
        return res.json({
            message: 'Playlist actualizada exitosamente'
        });
    } catch (error) {
        console.log('Error al actualizar la playlist', error);
        return res.status(500).json({
            message: 'Error al actualizar la playlist'
        })
    }
};


// Eliminar una playlist

export const eliminarPlaylist = async (req, res) => {
    const { id } = req.params;

    try {
        const playlistEliminada = await playlist.destroy({
            where: {
                id
            }
        });

        if (!playlistEliminada) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar la playlist'
            })
        }

         return res.json({
         message: 'Playlist eliminada correctamente',
         playlistEliminada
     });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
};