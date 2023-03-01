import { response, request } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuarios.js";
import { generarJWT } from "../helpers/generar-jwt.js";

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    // Verificar si el email existre
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }
    //Verificar la contrasena
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);
    //el ultimo procedimiento que hago
    res.json({
      msg: "Login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export { login };
