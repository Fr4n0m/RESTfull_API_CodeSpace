//Importamos el módulo de express para poder usarlo.
const express = require("express");

//Asignamos un puerto para levantar el server.
const PORT = 3000;

//Inicializamos express y podemos acceder a todas las funcionanilades que nos proporciona.
const app = express();

//Analizamos los archivos JSON.
app.use(express.json());

//Importamos el controlador que hemos creado.
const users = require('./controllers/usersControllers');
app.use("/users", users);

//Creamos una ruta raíz, es decir, la url base del sitio web será http://localhost:3000.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});