const {
  celebrate,
  Joi,
} = require('celebrate');

// eslint-disable-next-line no-useless-escape
const URL_REG_EXP = /^https?:\/\/(www\.)?[\w\-_~:\/#\[\]@!&',;=]+\.[\w\-_~:\/#\[\]@!&',;=а-я]+#?/i;

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

const idValidation = celebrate({
  params: Joi.object()
    .keys({
      _id: Joi.string()
        .alphanum()
        .length(24),
    }),
});

const createUserValidation = celebrate({
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
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

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

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REG_EXP),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REG_EXP),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  idValidation,
  createUserValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  userIdValidation,
};
