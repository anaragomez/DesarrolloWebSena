import { z } from "zod"; // Importa la librería Zod para validar esquemas.
export const registerSchema = z.object({ // Define el esquema de validación para el registro de usuario.
  username: z.string({ // Campo de nombre de usuario.
    required_error: "Username is required", // Mensaje de error si no se proporciona el nombre de usuario.
  }),
  email: z.string({ // Campo de correo electrónico.
    required_error: "Email is required", // Mensaje de error si no se proporciona el correo electrónico.
  }).email({ // Validación de formato de correo electrónico.
    message: "Email is not valid", // Mensaje de error si el formato de correo electrónico es inválido.
  }),
  password: z.string({ // Campo de contraseña.
    required_error: "Password is required", // Mensaje de error si no se proporciona la contraseña.
  }).min(6, { // Validación de longitud mínima de la contraseña.
    message: "Password must be at least 6 characters", // Mensaje de error si la contraseña es demasiado corta.
  }),
});
export const loginSchema = z.object({ // Define el esquema de validación para el inicio de sesión.
  email: z.string().email(), // Campo de correo electrónico con validación de formato de correo electrónico.
  password: z.string().min(6), // Campo de contraseña con validación de longitud mínima.
});