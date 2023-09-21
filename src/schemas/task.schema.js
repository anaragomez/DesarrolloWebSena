import { z } from "zod"; // Importa la librería Zod para validar esquemas.
export const createTaskSchema = z.object({ // Define el esquema de validación para crear una tarea.
  title: z.string({ // Campo de título de la tarea.
    required_error: "Title is required", // Mensaje de error si no se proporciona el título.
  }),
  description: z.string().optional(), // Campo opcional de descripción de la tarea.
  date: z.string().datetime().optional(), // Campo opcional de fecha y hora de la tarea.
});
export const loginSchema = z.object({ // Define el esquema de validación para el inicio de sesión.
  email: z.string().email(), // Campo de correo electrónico con validación de formato de correo electrónico.
  password: z.string().min(6), // Campo de contraseña con validación de longitud mínima.
});