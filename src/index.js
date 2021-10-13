const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json')
const { response } = require('express');


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
server.get("/movies", (req,res)=>{ 
  console.log('estoy en la url de movies')
  res.json(movies)
})


