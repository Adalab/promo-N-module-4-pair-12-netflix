const path = require('path');
const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const Database = require('better-sqlite3');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// init and config data base
const db = new Database('./src/data/database.db', {
  // this line log in console all data base queries
  verbose: console.log,
});

// API request > GET > http://localhost:4000/movies
server.get('/movies', (req, res) => {
  const query = db.prepare(`SELECT * FROM movies`);
  const moviesData = query.all();
  res.json({ movies: moviesData }
  );
});

server.get('/movie/:movieId', (req, res) => {
  console.log('Url params:', req.params);
  console.log('Url param promoId:', req.params.movieId);

  // find movie by movieId
  const movie = movies.movies.find(
    (movie) => movie.id === parseInt(req.params.movieId)
  );
  console.log('Found movie:', movie);
});

// Endpoint gestionar las peticiones sign-up
server.post('/sign-up', (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  if (email === "" || email === undefined || pass === "" || pass == undefined) {
    res.json({
      error: true,
      message: "debe enviar todos los datos"
    });
  } 
  
  //else {
    //usuario existe 
    //const querySelectUser = db.prepare("SELECT * FROM users WHERE email = ?");
    //const userFound = querySelectUser.get(email);

    //condicional 
    /*
    if (userFound === undefined) {
      const query = db.prepare("INSERT  into users(email, pass) values (?,?);");
      const userInsert = query.run(email, pass);
      res.json({
        error: false,
        userId: userInsert.lastInsertRowid
      });
    } else {
      res.json({
        error: true,
        message: "usuario ya existe"
      });
    }
    */
  }
})

// Configuración del servidor de estáticos
const staticServerPathWeb = './public';
server.use(express.static(staticServerPathWeb));

// Endpoint para gestionar los errores 404
server.get('*', (req, res) => {
  // Relativo a este directorio
  const notFoundFileRelativePath = '../web/404-not-found.html';
  const notFoundFileAbsolutePath = path.join(
    __dirname,
    notFoundFileRelativePath
  );
  res.status(404).sendFile(notFoundFileAbsolutePath);
});
