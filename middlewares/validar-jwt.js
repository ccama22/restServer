import { response, request } from "express";
import jwt from "jsonwebtoken";

import Usuario from "../models/usuarios.js";

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido - usaurio no existe DB",
      });
    }

    // Verificar si el uid tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario con estado: false",
      });
    }
    req.usuario = usuario; ///

    //req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
  //console.log(token);
  //next();
};

export { validarJWT };
