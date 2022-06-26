const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { auth } = require('./middlewares/auth');
const { login, createUser } = require('./controllers/user');

const { PORT = 3000 } = process.env; // порт, на котором будет прослушиватель сервера
const app = express();

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { errorHandler } = require('./utils/errorHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Коннект к MongoDB */
mongoose.connect('mongodb://localhost:27017/mestodb');

/** Роутинг */
/** Private */
app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardsRoute);

/** Public */
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(http(s)?:\/\/)?(www\.)?[A-Za-zА-Яа-я0-9-]*\.[A-Za-zА-Яа-я0-9-]{2,8}(\/?[\wа-яА-Я#!:.?+=&%@_~[\]$'*,;()-]*)*/),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

/** Любые маршруты, не подходящие под имеющиеся роуты, вызовут статус 404 */
app.use(auth, (req, res) => {
  errorHandler({ statusCode: 404 }, res);
});

app.listen(PORT);
