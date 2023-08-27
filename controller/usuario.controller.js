const ctrlUsuario = {};
import usuario from "../models/usuarios.js";
import bcrypt from "bcrypt";

// Crear un usuario
ctrlUsuario.crearUsuario = async (req, res) => {
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

        // Se retorna la respuesta al cliente
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

export default ctrlUsuario