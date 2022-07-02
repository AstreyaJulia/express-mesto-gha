const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { auth } = require('./middlewares/auth');
const {
  login,
  createUser,
} = require('./controllers/user');
const { STATUS } = require('./utils/constants/status');
const errorsHandler = require('./utils/errorHandler');
const NotFoundError = require('./errors/not-found-error');

/** Чтение env-переменных из .env-файла */
require('dotenv').config();

const { BD_CONNECT_URL } = process.env; // URL для коннекта к БД

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

/** HTTP-заголовки */
app.use(helmet());

/** Настройки ограничителя запросов
 * @type {Object}
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничивать на 100 запросов от одного IP на `window` (пред. значение)
  standardHeaders: true, // Возвращаем информацию о лимите в заголовки `RateLimit-*`
  legacyHeaders: false, // Блокируем заголовки `X-RateLimit-*`
});

/** Органичитель кол-ва запросов. Защита от DDoS */
app.use(limiter);

/** Коннект к MongoDB */
mongoose.connect(BD_CONNECT_URL);

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

/** Прослушиватель запросов */
app.listen(PORT);
