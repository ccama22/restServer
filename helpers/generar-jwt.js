import jwt from "jsonwebtoken";

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    //SPRIVATEKEY es una llave secreta que si alguien la llega a conocer les van a permitir firmar token como si lo hubieran creado en su backend
    // si alguien toma este secretpriveket de esta variable de entorno tambien va a poder firmar sus token
    /* si un token es firmado y ustedes cambia el secretpriveket
      tambien va a ser que todos sus json webtoken no sirvan
    */
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puede generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
export { generarJWT };
