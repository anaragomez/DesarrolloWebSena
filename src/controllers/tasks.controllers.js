import Task from "../models/task.model.js"; // Importa el modelo de Task desde el archivo task.model.js.
export const getTasks = async (req, res) => { // Función asincrónica para obtener todas las tareas.
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user"); // Busca todas las tareas asociadas al usuario actual y las popula con el usuario.
    res.json(tasks); // Devuelve las tareas en formato JSON.
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Si hay un error, devuelve un error interno del servidor.
  }
};
export const createTask = async (req, res) => { // Función asincrónica para crear una nueva tarea.
  try {
    const { title, description, date } = req.body; // Obtiene los datos de la nueva tarea del cuerpo de la solicitud.
    const newTask = new Task({ // Crea una nueva instancia de Task con los datos proporcionados.
      title,
      description,
      date,
      user: req.user.id, // Asigna el ID del usuario actual a la tarea.
    });
    await newTask.save(); // Guarda la nueva tarea en la base de datos.
    res.json(newTask); // Devuelve la nueva tarea en formato JSON.
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Si hay un error, devuelve un error interno del servidor.
  }
};
export const deleteTask = async (req, res) => { // Función asincrónica para eliminar una tarea.
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Busca y elimina la tarea por su ID.
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" }); // Si la tarea no existe, devuelve un error de tarea no encontrada.
    return res.sendStatus(204); // Devuelve un estado de éxito sin contenido.
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Si hay un error, devuelve un error interno del servidor.
  }
};
export const updateTask = async (req, res) => { // Función asincrónica para actualizar una tarea.
  try {
    const { title, description, date } = req.body; // Obtiene los datos actualizados de la tarea del cuerpo de la solicitud.
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id }, // Busca la tarea por su ID.
      { title, description, date }, // Actualiza los campos de la tarea con los nuevos valores.
      { new: true } // Devuelve la tarea actualizada en lugar de la anterior.
    );
    return res.json(taskUpdated); // Devuelve la tarea actualizada en formato JSON.
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Si hay un error, devuelve un error interno del servidor.
  }
};
export const getTask = async (req, res) => { // Función asincrónica para obtener una tarea por su ID.
  try {
    const task = await Task.findById(req.params.id); // Busca la tarea por su ID.
    if (!task)
      return res.status(404).json({ message: "Task not found" }); // Si la tarea no existe, devuelve un error de tarea no encontrada.
    return res.json(task); // Devuelve la tarea en formato JSON.
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Si hay un error, devuelve un error interno del servidor.
  }
};
