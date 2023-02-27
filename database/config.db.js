import mongoose from "mongoose";

// hace que las consultas solo funcionen en campos que están definidos en el esquema de Mongoose.
mongoose.set("strictQuery", true);

mongoose.set("returnOriginal", false);
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error);
    // Error controlado para la consola
    throw new Error("Error a la hora de iniciar la base de data");
  }
};

export { dbConnection };
