import usuario from "../models/usuarios.js";
import bcrypt from "bcrypt";
import playlist from "../models/playlist.js";


// Crear un usuario
export const crearUsuario = async (req, res) => {
    const {
        nombre,
        apellido,
        email,
        user,
        contraseña
    } = req.body; 
    try {
        // Se verifica si el usuario ya existe
        const existeUsuario = await usuario.findOne({
            where: {
                email
            }
        });

        if (existeUsuario) {
            throw ({ 
                status: 400,
                message: 'El usuario ya existe',
            })
        };
        const nuevoUsuario = new usuario({
            nombre,
            apellido,
            email,
            user,
            contraseña,
        });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        nuevoUsuario.contraseña = await bcrypt.hash(contraseña, salt);

        // Guardar usuario en la base de datos
        const usuarioCreado = await nuevoUsuario.save();

        if (!usuarioCreado) {
            throw ({
                message: 'Error al crear el usuario',
            })
        }

         //Se retorna la respuesta al cliente
         return res.status(201).json({
             message: 'Usuario creado exitosamente',
         });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al crear el usuario',
        });
    }


};


// Obtener todos los usuarios

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuario.findAll();

        return res.json(usuarios);
    } catch (error) {
        console.log('Error al obtener los usuarios', error);
        return res.status(500).json({
            message: 'Error al obtener los usuarios'
        })
    }
    
};


// Obtener un usuario

export const obtenerUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarios = await usuario.findOne({
            where: {
                id
            },
            include: [{ model: playlist}]
        });

        if (!usuarios) {
            throw ({
                status: 404,
                message: 'No existe el usuario'
            })
        }
    
        return res.json(usuarios);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }

    
};