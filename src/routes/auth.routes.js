import { Router } from "express"; // Importa el enrutador de Express.
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js"; // Importa las funciones de controlador para la autenticación.
import { validateSchema } from "../middlewares/validator.middleware.js"; // Importa el middleware para validar esquemas.
import { loginSchema, registerSchema } from "../schemas/auth.schema.js"; // Importa los esquemas de validación para la autenticación.
const router = Router(); // Crea una instancia del enrutador de Express.
router.post("/register", validateSchema(registerSchema), register); // Define la ruta para registrar un usuario y valida el esquema de datos.
router.post("/login", validateSchema(loginSchema), login); // Define la ruta para iniciar sesión y valida el esquema de datos.
router.get("/verify", verifyToken); // Define la ruta para verificar el token de autenticación.
router.post("/logout", verifyToken, logout); // Define la ruta para cerrar sesión y verifica el token de autenticación.
export default router; // Exporta el enrutador de Express con las rutas definidas.