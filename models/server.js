import express from "express";
import cors from "cors";
import { router } from "../routes/user.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    /*Middleawares : son funciones que van a brindar otra funcionalidad a mi webserver, en otras palabras es una funcion
    que siempre va ejecutarse cuando nosotros levantemos nuestro servidor*/

    // Middleawares
    this.middlewares();

    // Rutas de mi aplicaciòn
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    // cualquier informacion que venga lo va intentar serializar A
    //un formato JSON
    this.app.use(express.json());
    // Directorio Publico
    this.app.use(express.static("public"));
  }

  routes() {
    /*this.app.get("/api", (req, res) => {
      //res.send("Hello World");
      res.status(403).json({
        msg: "get API",
      });
    });*/
    this.app.use(this.usuariosPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
export { Server };
