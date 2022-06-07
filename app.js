const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env; // порт, на котором будет прослушиватель сервера
const app = express();

/** Коннект к MongoDB */
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT);
