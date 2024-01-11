const mongoose = require('mongoose');
var express = require('express')
var cors = require('cors')
var app = express()



const port = 8000;
app.use(cors())

app.use(express.json())
// this one is for connection with mongoose server 
mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

 // this one is just for listing 
  app.listen(port, () => {
    console.log(`Notes app listening on port http://localhost:${port}`);
  });


  // Available Routes for crating api // this is api path means http//localhost:8000/api/auth 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/auth', require('./routes/notes'))
  