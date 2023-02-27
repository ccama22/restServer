import Role from "../models/roles.js";
import Usuario from "../models/usuarios.js";

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};
const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    // return res.status(400).json({
    //   mssg: "Ese correo ya esta registrado",
    // });
    throw new Error(`El correo: ${correo}, ya esta registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};
export { esRoleValido, emailExiste, existeUsuarioPorId };
