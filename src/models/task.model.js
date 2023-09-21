import mongoose from "mongoose"; // Importa la librería de Mongoose para trabajar con MongoDB.
const taskSchema = new mongoose.Schema( // Define el esquema para las tareas.
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Task", taskSchema); // Exporta el modelo de tarea definido con el esquema.
