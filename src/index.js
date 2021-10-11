const express = require('express');
const cors = require('cors');

// create and config server

const server = express();
server.use(cors());
server.use(express.json());
server.get("/movies", (req,res)=>{
//res.
})
// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
