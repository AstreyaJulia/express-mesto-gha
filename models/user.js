const { Schema, model } = require('mongoose');
const { isEmail, isURL } = require('validator');
const { compare } = require('bcryptjs');
const AuthError = require('../error/auth-error');
const { STATUS } = require('../utils/constants');

/** Схема пользователя
 * @type {Object}
 * name - имя пользователя, about - подпись пользователя, avatar - ссылка на аватар
 * email - email пользователя, password - хэш пароля
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: false,
      validate: {
        validator(link) {
          return isURL(link);
        },
        message: 'Введён некорректный URL',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      validate: {
        validator(email) {
          return isEmail(email);
        },
        message: '',
      },
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(STATUS.AUTH_FAIL));
      }
      return compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(STATUS.AUTH_FAIL));
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
