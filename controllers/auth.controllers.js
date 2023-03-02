import { response, request } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuarios.js";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";
import { DefaultTransporter } from "google-auth-library";

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { correo, nombre, img } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      console.logh("ccama xxx");
      const data = {
        nombre,
        correo,
        rol: "USER_ROLE",
        password: ":P",
        img,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }
    // Si el usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id);
    //console.log(googleUser);

    res.json({
      usuario,
      //id_token,
      //googleUser,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es valido",
    });
  }
};

export { login, googleSignIn };
