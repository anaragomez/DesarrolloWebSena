import { TOKEN_SECRET } from "../config.js"; // Importa la clave secreta del token desde el archivo de configuración.
import jwt from "jsonwebtoken"; // Importa la librería jwt para trabajar con tokens JWT.
export async function createAccessToken(payload) { // Función asincrónica para crear un token de acceso.
  return new Promise((resolve, reject) => { // Crea una nueva promesa para envolver la generación del token.
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => { // Genera el token con el payload y la clave secreta.
      if (err) reject(err); // Si hay un error al generar el token, rechaza la promesa con el error.
      resolve(token); // Si se genera el token correctamente, resuelve la promesa con el token.
    });
  });
}
