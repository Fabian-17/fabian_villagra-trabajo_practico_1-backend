import { checkSchema } from 'express-validator';

export const usuarioSchema = checkSchema({
  email: {
    errorMessage: 'El email ingresado es invalido',
    isEmail: true
  },
  contraseña: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'La contraseña como minimo debe tener 8 caracteres'
    }
  }
});