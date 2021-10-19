const path = require('path');
const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const Database = require('better-sqlite3');

// * create and config server
const server = express();
server.use(cors());
server.use(express.json());

// * init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// * init and config data base
const db = new Database('./src/data/database.db', {
  // this line log in console all data base queries
  verbose: console.log,
});

// * API request > GET > http://localhost:4000/movies
server.get('/movies', (req, res) => {
  // Código para traer la info de la base de datos
  const query = db.prepare('SELECT * FROM movies');
  // ejecucion de la query
  const moviesData = query.all();
  // respuesta, con los datos de movies
  res.json({ movies: moviesData });
});

// * endpoint para peliculas individuales
server.get('/movie/:movieId', (req, res) => {
  // find movie by movieId
  const movie = movies.movies.find(
    (movie) => movie.id === parseInt(req.params.movieId)
  );

  // respuesta con los datos de las peliculas.
  if (movie === undefined) {
    res.json({ error: 'Pelicula no encontrada 🤷‍♀️' });
  } else {
    res.json({result: 'success', name: movie.title, gender: movie.gender });
  }
});

// * endpoint gestionar las peticiones sign-up
// fake user new data base
const userNew = [];
// endpoing sign-up
server.post('/sign-up', (req, res) => {
  console.log('Body params:', req.body);
  console.log('Body param email:', req.body.email);
  console.log('Body param password:', req.body.password);
  
  // se reciben los datos del front:
  const email = req.body.email;
  const password = req.body.password;

  // se añade info a la base data base
  userNew.push({
    email: email,
    password: password
  })
  
  // respuesta de los datos al front, si fue o no fue exitosa la solicitud
  res.json({
    result: 'User created',
    data: userNew
  });

});

// * endpoint para favoritos de las usuarias
server.get('/user/movies', (req, res) => {
  // se trae el dato introducido por el front
  const userId = req.header('userId');

  // respuesta si la usuaria ha sido encontrada
  res.json({
    result: 'success',
    id: userId
  })
});

// * endpoint para gestionar los errores 404
server.get('*', (req, res) => {
  // Relativo a este directorio
  const notFoundFileRelativePath = '../web/404-not-found.html';
  const notFoundFileAbsolutePath = path.join(
    __dirname,
    notFoundFileRelativePath
  );
  res.status(404).sendFile(notFoundFileAbsolutePath);
});

// * Configuración del servidor de estáticos 
// pendiente por terminar ...
const staticServerPathWeb = './public';
server.use(express.static(staticServerPathWeb));