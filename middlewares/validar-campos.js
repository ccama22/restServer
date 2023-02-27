import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  //siga con el siguiente middlewear y si no hay otro middlewear seria el controlador
  next();
};

export { validarCampos };
