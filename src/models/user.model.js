import mongoose from "mongoose"; // Importa la librería de Mongoose para trabajar con MongoDB.
 const userSchema = new mongoose.Schema( // Define el esquema para los usuarios.
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
 export default mongoose.model("User", userSchema); // Exporta el modelo de usuario definido con el esquema.
