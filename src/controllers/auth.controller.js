import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
// Función para registrar un nuevo usuario
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });
    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    // Crear el usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    // Guardar el usuario en la base de datos
    const userSaved = await newUser.save();
    // Crear un token de acceso
    const token = await createAccessToken({
      id: userSaved._id,
    });
    // Configurar la cookie del token
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    // Devolver los datos del usuario registrado
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Función para iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }
    // Crear un token de acceso
    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });
    // Configurar la cookie del token
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    // Devolver los datos del usuario autenticado
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Función para verificar el token de acceso
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);
  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);
    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);
    // Devolver los datos del usuario verificado
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
// Función para cerrar sesión
export const logout = async (req, res) => {
  // Limpiar la cookie del token
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};