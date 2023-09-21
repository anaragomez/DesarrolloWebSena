import express from "express"; // Importa el módulo "express" para crear una instancia de la aplicación del servidor.
import cors from "cors"; // Importa el módulo "cors" para habilitar el intercambio de recursos de origen cruzado (CORS) en el servidor.
import morgan from "morgan"; // Importa el módulo "morgan" para registrar las solicitudes HTTP en la consola del servidor.
import cookieParser from "cookie-parser"; // Importa el módulo "cookie-parser" para analizar las cookies de las solicitudes entrantes.
 import authRoutes from "./routes/auth.routes.js"; // Importa las rutas relacionadas con la autenticación de usuarios desde un archivo separado.
import taksRoutes from "./routes/tasks.routes.js"; // Importa las rutas relacionadas con las tareas desde otro archivo separado.
import { FRONTEND_URL } from "./config.js"; // Importa la constante `FRONTEND_URL` desde un archivo de configuración separado.
 const app = express(); // Crea una instancia de la aplicación Express.
 app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
); // Configura el middleware "cors" para permitir solicitudes desde el origen especificado en `FRONTEND_URL`.
 app.use(express.json()); // Configura el middleware para analizar el cuerpo de las solicitudes entrantes con formato JSON.
app.use(morgan("dev")); // Configura el middleware "morgan" para registrar las solicitudes en la consola con el formato "dev".
app.use(cookieParser()); // Configura el middleware "cookie-parser" para analizar las cookies de las solicitudes entrantes.
 app.use("/api/auth", authRoutes); // Configura las rutas relacionadas con la autenticación bajo el prefijo "/api/auth".
app.use("/api", taksRoutes); // Configura las rutas relacionadas con las tareas bajo el prefijo "/api".
 if (process.env.NODE_ENV === "production") {
  const path = await import("path"); // Importa el módulo "path" de Node.js para trabajar con rutas de archivos.
  app.use(express.static("client/dist")); // Configura el middleware para servir archivos estáticos desde la carpeta "client/dist".
   app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html")); // Imprime la ruta completa del archivo "index.html".
    res.sendFile(path.resolve("client", "dist", "index.html")); // Devuelve el archivo "index.html" ubicado en la carpeta "client/dist".
  });
}
 export default app; // Exporta la instancia de la aplicación Express como el módulo principal del archivo.