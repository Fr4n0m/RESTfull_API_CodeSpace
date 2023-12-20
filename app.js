const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000;
const userRouter = require("./router/userRoutes");
const productsRouter = require("./router/productRoutes");

const app = express();

app.use(express.json());

//*Hacemos la conexión con la bbdd mongo.
require("dotenv").config(); //?Esto nos permite coger la config que hay en el fichero .env

const mongo_URL = process.env.DATABASE_URL_DEV;
mongoose.connect(mongo_URL);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectarnos a MongoDB: ${error}`);
});

db.on("connected", () => {
  console.log("Se ha establecido una conexión exitosa a MongoDB.");
});

db.on("disconnected", () => {
  console.log("La conexión a MongoDB se cerró correctamente.");
});

//Importamos el controlador que hemos creado.
app.use("/users", userRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); //Creamos una ruta raíz, es decir, la url base del sitio web será http://localhost:3000.
});
