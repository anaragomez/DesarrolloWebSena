export const PORT = process.env.PORT || 4000; // Puerto en el que se ejecutará el servidor, utiliza el valor proporcionado en la variable de entorno PORT, o el puerto 4000 por defecto.
 export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://anamrg11:_1995AL19@merndb.oifolrz.mongodb.net";
// URI de conexión a la base de datos de MongoDB, utiliza el valor proporcionado en la variable de entorno MONGODB_URI, o una URI de conexión predeterminada.
 export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
// Clave secreta utilizada para firmar y verificar los tokens de autenticación, utiliza el valor proporcionado en la variable de entorno TOKEN_SECRET, o una clave secreta predeterminada.
 export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// URL del frontend de la aplicación, utiliza el valor proporcionado en la variable de entorno FRONTEND_URL, o una URL de frontend predeterminada.