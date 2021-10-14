const path = require('path');
const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');


// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// API request > GET > http://localhost:4000/movies
server.get('/movies', (req, res) => {
  console.log('estoy en la url de movies');
  res.json(movies);
});

server.get('/movie/:movieId', (req, res) => {
  console.log('Url params:', req.params);
  console.log('Url param promoId:', req.params.movieId);

    // find movie by movieId
    const movie = movies.movies.find(movie => movie.id === parseInt(req.params.movieId));
    console.log('Found movie:', movie);
  
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
