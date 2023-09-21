export const validateSchema = (schema) => (req, res, next) => { // Función de middleware para validar un esquema.
  try {
    schema.parse(req.body); // Valida el esquema con los datos de la solicitud.
    next(); // Si la validación es exitosa, pasa al siguiente middleware.
  } catch (error) { // Si hay un error en la validación, devuelve un error de solicitud incorrecta (400).
    return res
      .status(400)
      .json({ message: error.errors.map((error) => error.message) }); // Devuelve un mensaje de error con los detalles de la validación.
  }
};
