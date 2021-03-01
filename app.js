const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Import Routes
const saucesRoute = require('./routes/sauces ');
const authRoute = require('./routes/auth');

// Route MiddLewares
app.use('/api/sauces', saucesRoute);
app.use('/api/auth', authRoute);


// connect TO DB
mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connecte to DB'))
  .catch((error) => console.log('unable to connect to DB'));




// Listening to the server
app.listen(3000, () => console.log('server listen in port 3000'))