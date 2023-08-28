import canciones from "../models/canciones.js";
import playlist from "../models/playlist.js";

// Crear unacancion
export const crearCancion = async (req, res) => {
    const { nombre_cancion, id_playlist } = req.body;


    try {
        // Se valida que nombre_cancion no esté vacío
        if (!nombre_cancion) {
            return res.status(400).json({ message: 'El nombre de la canción no puede estar vacío' });
        }

        // Consultar si la playlist existe
        const existePlaylist = await playlist.findByPk(id_playlist);

        if (!existePlaylist) {
            return res.status(400).json({ message: 'La playlist no existe' });
        }

        // Crear una nueva instancia de concion
        const nuevacancion = new canciones({
            nombre_cancion,
            id_playlist 
        });

        // Guardar en la BD
        await nuevacancion.save();

        return res.status(201).json({ message: 'Canción creada con éxito', canciones: nuevacancion });
    } catch (error) {
        console.error('Error al crear la canción', error);
        return res.status(500).json({ message: 'Error al crear la canción', error: error.message });
    }
};


// Obtener todos las canciones

export const obtenerCanciones = async (req, res) => {
    try {
        const cancion = await canciones.findAll();

        return res.json(cancion);
    } catch (error) {
        console.log('Error al obtener las canciones', error);
        return res.status(500).json({
            message: 'Error al obtener las canciones'
        })
    }
    
};


// Obtener una canción

export const obtenerCancion = async (req, res) => {
    const { id } = req.params;

    try {
        const music = await canciones.findOne({
            where: {
                id
            }
        });

        if (!music) {
            throw ({
                status: 404,
                message: 'No existe la cancion'
            })
        }
    
        return res.json(music);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }

    
};