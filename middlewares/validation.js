/** Celebrate-валидатор */
const {
  celebrate,
  Joi,
} = require('celebrate');
const { URL_REG_EXP } = require('../utils/constants/url-regexp');

/** Валидация полей входа пользователя */
const signinValidation = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .min(3)
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

/** Валидация полей регистрации пользователя */
const signupValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .pattern(URL_REG_EXP),
      email: Joi.string()
        .min(3)
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

/** Валидация дефолтного бд-поля _id */
const idValidation = celebrate({
  params: Joi.object()
    .keys({
      _id: Joi.string()
        .hex()
        .length(24),
    }),
});

/** Валидация cardId для операций с карточками */
const idCardValidation = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .hex()
        .length(24),
    }),
});

/** Валидация userId для операций с данными пользователя */
const userIdValidation = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .length(24)
        .hex()
        .required(),
    }),
});

/** Валидация полей обновления профиля пользователя */
const updateProfileValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(2)
        .max(30),
    }),
});

/** Валидация полей обновления аватара пользователя */
const updateAvatarValidation = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .pattern(URL_REG_EXP),
    }),
});

/** Валидация полей создания карточки */
const createCardValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .pattern(URL_REG_EXP),
    }),
});

module.exports = {
  signinValidation,
  signupValidation,
  idValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  userIdValidation,
  idCardValidation,
};
