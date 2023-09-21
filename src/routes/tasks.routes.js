import { Router } from "express"; // Importa el enrutador de Express.
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controllers.js"; // Importa las funciones de controlador para las tareas.
import { auth } from "../middlewares/auth.middleware.js"; // Importa el middleware de autenticación.
import { validateSchema } from "../middlewares/validator.middleware.js"; // Importa el middleware para validar esquemas.
import { createTaskSchema } from "../schemas/task.schema.js"; // Importa el esquema de validación para las tareas.
const router = Router(); // Crea una instancia del enrutador de Express.
router.get("/tasks", auth, getTasks); // Define la ruta para obtener todas las tareas y requiere autenticación.
router.post("/tasks", auth, validateSchema(createTaskSchema), createTask); // Define la ruta para crear una tarea y requiere autenticación y validación del esquema.
router.get("/tasks/:id", auth, getTask); // Define la ruta para obtener una tarea por su ID y requiere autenticación.
router.put("/tasks/:id", auth, updateTask); // Define la ruta para actualizar una tarea por su ID y requiere autenticación.
router.delete("/tasks/:id", auth, deleteTask); // Define la ruta para eliminar una tarea por su ID y requiere autenticación.
export default router; // Exporta el enrutador de Express con las rutas definidas.