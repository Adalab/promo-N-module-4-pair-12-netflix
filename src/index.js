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
  res.json(moviesData);
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
