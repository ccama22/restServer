import { Router } from "express";
import { check, query } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { googleSignIn, login } from "../controllers/auth.controllers.js";

const routerLogin = Router();

routerLogin.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contrasena es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

routerLogin.post(
  "/google",
  [check("id_token", "id_token es necesario").not().isEmpty(), validarCampos],
  googleSignIn
);

export { routerLogin };
