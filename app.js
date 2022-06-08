const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env; // порт, на котором будет прослушиватель сервера
const app = express();

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { responseHelper } = require('./utils/responseHelper');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Коннект к MongoDB */
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '62a07126753eb9bf5f1278b0',
  };
  next();
});

/** Роутинг */
app.use(usersRoute);
app.use(cardsRoute);

/** Любые маршруты, не подходящие под имеющиеся роуты, вызовут статус 404 */
app.all('*', (req, res) => {
  responseHelper(null, { statusCode: 404 }, res);
});

app.listen(PORT);
