import { response, request } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuarios.js";

const userGet = async (req = request, res = response) => {
  //const query = req.query;
  // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    // msg: "get API - usuariosGet",
    // q,
    // nombre,
    // apikey,
    // page,
    // limit,
    /*=====*/
    // total,
    // usuarios,
    total,
    usuarios,
  });
};
const userPost = async (req, res = response) => {
  //const body = req.body;
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  console.log("password", usuario.password);
  // Verificar si el correo existe

  // Encriptar la contrasena
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  // Guardar em BD
  await usuario.save();

  res.json({
    msg: "post API - usuariosPost",
    usuario,
  });
};
const userPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;
  // Todo VALIDAR CONTRA base de datos
  if (password) {
    // Encriptar la contrasena
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json(
    //msg: "put API - usuariosPut",
    usuario
  );
};
const userPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};
const userDelete = async (req, res = response) => {
  const { id } = req.params;
  //const uid = req.uid;
  //Fisicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  //const usarioAutenticado = req.usuario;

  //res.json({ usuario, usarioAutenticado });
  res.json(usuario);
};

export { userGet, userPost, userPut, userPatch, userDelete };
