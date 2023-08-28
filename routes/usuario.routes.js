import { Router } from "express";
import {crearUsuario, obtenerUsuario, obtenerUsuarios, createUser } from "../controller/usuario.controller.js";
import { validateSchema } from "../middleware/ValidationSchema.js";
import { usuarioSchema } from "../models/usuarios.schema.js";

const router = Router();

router.get('/obtenerUsuario', obtenerUsuarios);
router.get('/obtenerUsuario/:id', obtenerUsuario);

router.post('/crearUsuario', usuarioSchema, createUser, validateSchema, crearUsuario);

export {router}