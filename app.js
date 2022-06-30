const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { auth } = require('./middlewares/auth');
const {
  login,
  createUser,
} = require('./controllers/user');
const { STATUS } = require('./utils/constants');
const errorsHandler = require('./utils/errorHandler');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env; // порт, на котором будет прослушиватель сервера
const app = express();

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const {
  signinValidation,
  signupValidation,
} = require('./middlewares/validation');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Коннект к MongoDB */
mongoose.connect('mongodb://localhost:27017/mestodb');

/** Роутинг */
/** Private */
app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardsRoute);

/** Public */
app.post('/signin', signinValidation, login);

app.post('/signup', signupValidation, createUser);

/** Любые маршруты, не подходящие под имеющиеся роуты, вызовут статус 404 */
app.use((req, res, next) => {
  next(new NotFoundError(STATUS.NOT_FOUND));
});

/** Обработчик ошибок Celebrate */
app.use(errors());

/** Обработчик ошибок */
app.use(errorsHandler);

app.listen(PORT);
