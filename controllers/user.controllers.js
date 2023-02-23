import { response, request } from "express";

const userGet = (req = request, res = response) => {
  //const query = req.query;
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - usuariosGet",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};
const userPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API - usuariosPost",
    nombre,
    edad,
  });
};
const userPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API - usuariosPut",
    id,
  });
};
const userPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};
const userDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usuariosDelete",
  });
};
export { userGet, userPost, userPut, userPatch, userDelete };
