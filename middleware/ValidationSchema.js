import { validationResult } from 'express-validator';

// verifica si hay errores
export const validateSchema = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};