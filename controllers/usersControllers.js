const { parse } = require('dotenv');

const router = require('express').Router();

let USERS = [
    {id: 1, name: "Usuario 1", email: "usuario1@example.com"},
    {id: 2, name: "Usuario 2", email: "usuario2@example.com"},
    {id: 3, name: "Usuario 3", email: "usuario3@example.com"}
]


//Método get para obtener todas las colecciones.
router.get('/', (req, res) => {
    res.send(USERS);
});

//Método get para obtener un único usuario.
router.get('/:id', (req,res)=> {
    //Convertimos id de la URL en un entero.
    const userId = parseInt(req.params.id);
    //Buscamos el usuario por su ID y lo enviamos como respuesta.
    const user = USERS.find((user) => user.id === userId)
    
    res.send(user);
});

//Método update para obtener un único usuario.
router.patch('/:id', (req,res)=> {
     //Convertimos id de la URL en un entero.
     const userId = parseInt(req.params.id);
     const { name, email } = req.body;
     //Buscamos el usuario por su ID y lo enviamos como respuesta.
     const user = USERS.find((user) => user.id === userId)
    
     if (!user) {
        res.send("El usuario no existe.");
     } 
     
     if (name) {
        user.name = req.body.name;
     }

     if (email) {
        user.email = req.body.email;
     }

     res.send(user);
});

//Método post para añadir un único usuario.
router.post('/', (req,res)=> {
    res.send(`Soy post ${JSON.stringify(req.body)}`);
});

//Método delete para borrar un único usuario.
router.delete('/:id', (req,res)=> {
    const userId = parseInt(req.params.id);
    filteredUsers = USERS.filter((user) => user.id !== userId);

    if (filteredUsers.length === USERS.length) {
        res.send("El usuario no existe.");
    } else {
        USERS = filteredUsers;
        res.send(filteredUsers);
    }
});

//Para exportar el controlador.
module.exports = router;