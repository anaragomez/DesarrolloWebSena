import jwt from "jsonwebtoken"; // Importa la librería jwt para trabajar con tokens JWT.
import { TOKEN_SECRET } from "../config.js"; // Importa la clave secreta del token desde el archivo de configuración.
export const auth = (req, res, next) => { // Función de middleware para autenticación.
  try {
    const { token } = req.cookies; // Obtiene el token de las cookies de la solicitud.
    if (!token) // Si no hay token, devuelve un error de autorización.
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    jwt.verify(token, TOKEN_SECRET, (error, user) => { // Verifica la validez del token.
      if (error) { // Si hay un error en la verificación, devuelve un error de token no válido.
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user; // Almacena la información del usuario en el objeto de solicitud.
      next(); // Pasa al siguiente middleware.
    });
  } catch (error) { // Si hay un error en el proceso, devuelve un error interno del servidor.
    return res.status(500).json({ message: error.message });
  }
};