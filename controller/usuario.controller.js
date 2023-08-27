import usuario from "../models/usuarios.js";
import bcrypt from "bcrypt";
import { body, validationResult } from 'express-validator';

export const createUser = (req, res) => {
    body('email').notEmpty().isEmail();
    body('password').notEmpty();
  
    const errors = validationResult(req);
  
    if (errors.isEmpty()) {
      return res.json(req.body);
    }
    console.log(req.body);
    res.status(400).json(errors.array());
  };

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

    console.log('funca')
};


// Obtener todos los usuarios

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuario.findAll({
            where: {
                id: req.params.id
            }
        });

        return res.json(usuarios);
    } catch (error) {
        console.log('Error al obtener los usuarios', error);
        return res.status(500).json({
            message: 'Error al obtener los usuarios'
        })
    }
    console.log('funca2')
};


// Obtener un usuario

export const obtenerUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await usuario.findOne({
            where: {
                id
            }
        });

        if (!usuario) {
            throw ({
                status: 404,
                message: 'No existe el usuario'
            })
        }
    
        return res.json(usuario);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }

    console.log('funca3')
};