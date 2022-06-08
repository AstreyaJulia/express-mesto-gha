const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env; // порт, на котором будет прослушиватель сервера
const app = express();

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Коннект к MongoDB */
mongoose.connect('mongodb://localhost:27017/mestodb'); // Mongoose 6 не нужны параметры

app.use((req, res, next) => {
  req.user = {
    _id: '62a07126753eb9bf5f1278b0',
  };
  next();
});

app.use(usersRoute);
app.use(cardsRoute);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
