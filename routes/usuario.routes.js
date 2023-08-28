import { Router } from "express";
import {crearUsuario, obtenerUsuario, obtenerUsuarios } from "../controller/usuario.controller.js";
import { validateSchema } from "../middleware/ValidationSchema.js";
import { usuarioSchema } from "../models/usuarios.schema.js";

const UsuarioRouter = Router();

UsuarioRouter.get('/', obtenerUsuarios);
UsuarioRouter.get('/:id', obtenerUsuario);

UsuarioRouter.post('/', usuarioSchema, validateSchema, crearUsuario);

export {UsuarioRouter}