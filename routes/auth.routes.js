import { Router } from "express";
import { check, query } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { login } from "../controllers/auth.controllers.js";

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

export { routerLogin };
