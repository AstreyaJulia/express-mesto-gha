/** Объект для статусов HTTP
 * @type Object
 */
const STATUS = {
  NOT_FOUND: 'Запрашиваемый ресурс не найден',
  AUTH_FAIL: 'Передан неверный логин или пароль',
  USER_NOT_FOUND: 'Запрашиваемый пользователь не найден',
  EMAIL_EXIST: 'Пользователь с таким e-mail уже зарегистрирован',
  CREATE_USER_VALIDATION: 'Одно или несколько переданных значений при создании пользователя некорректны',
  UPDATE_AVATAR_VALIDATION: 'Одно или несколько переданных значений при обновлении аватара некорректны',
  UPDATE_PROFILE_VALIDATION: 'Одно или несколько переданных значений при обновлении профиля некорректны',
  CREATE_CARD_VALIDATION: 'Одно или несколько переданных значений при создании карточки некорректны',
  CARD_NOT_FOUND: 'Запрашиваемая карточка не найдена',
  DEL_CARD_FORBIDDEN: 'Можно удалять только созданные вами карточки',
  UPDATE_CARD_VALIDATION: 'Одно или несколько переданных значений при обновлении карточки некорректны',
  AUTH_REQUIRED: 'Токен авторизации не передан или невалиден',
};

/** Secret key для генерации и валидации JWT
 * @type {string}
 */
const SECRET_KEY = '1nAzbR2082Htx4p5ddzxZZqlmcXNDgqfmT5PqyTk0H4OQtKfZHyjew2xUlhnD3X';

module.exports = {
  STATUS,
  SECRET_KEY,
};
