const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors'); //to allow different domains
require('dotenv/config');


// Middlewares
app.use(cors());
app.use(bodyParser.json());


//Import Routes
const saucesRoute = require('./routes/sauces ');
const authRoute = require('./routes/auth');

// Route MiddLewares
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoute);
app.use('/api/auth', authRoute);

// connect TO DB
mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connecte to DB'))
  .catch((error) => console.log('unable to connect to DB'));



module.exports = app;