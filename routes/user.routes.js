import { Router } from "express";
import { check, query } from "express-validator";

// import { validarCampos } from "../middlewares/validar-campos.js";
// import { validarJWT } from "../middlewares/validar-jwt.js";
// import { esAdminRole, tieneRole } from "../middlewares/validar-roles.js";
import {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} from "../middlewares/index.js";

import {
  emailExiste,
  esRoleValido,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";
import {
  userDelete,
  userGet,
  userPatch,
  userPost,
  userPut,
} from "../controllers/user.controllers.js";

const router = Router();

router.get(
  "/",
  [
    query("limite", "El valor de 'limite' debe ser numerico")
      .isNumeric()
      .optional(),
    query("desde", "El valor de 'desde' debe ser numerico")
      .isNumeric()
      .optional(),
    validarCampos,
  ],
  userGet
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  userPut
);

router.post(
  "/",
  //esta creando en la request todos los errores que yo voy a ir poniendo lo va a ir almacenando ahi
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({
      min: 6,
    }),
    //check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    //validacion personalizada con el custom
    check("rol").custom(esRoleValido),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    // porque ya tenga todas las validaciones del check hecha quiero e
    //ejecutar la que va a revisar los errores de cada uno de estos check y si ese middlewear pasa
    // ejecuta ese controlador si no hasta qui vas a llegar
    validarCampos,
  ],
  userPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  userDelete
);

router.patch("/", userPatch);

export { router };
