const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const events = require('./routes/api/events');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB via Mongoose
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello!!'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/events', events);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));