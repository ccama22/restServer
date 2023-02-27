import { Schema, model } from "mongoose";
import mongooseHidden from "mongoose-hidden";

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    requireç: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contrasena es obligatoria"],
    hide: true,
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    //enum: ["ADMIN_ROLE", "USER_ROLE",],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// UsuarioSchema.plugin(mongooseHidden, {
//   hidden: { _id: true, password: true },
// });
UsuarioSchema.methods.toJSON = function () {
  // funcion normal porque voy a usar el objeto this y una funcion flecha   mantiene a lo que apunta el this fuera de la misma y yo necesito que hay este el thi para que haga referencia a la instancia creada

  // me va a generar mi instancia pero con sus valores respectivos
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

// UsuarioSchema.plugin(mongooseHidden(), { hidden: { password: true } });
const Usuario = model("Usuario", UsuarioSchema);
export default Usuario;
