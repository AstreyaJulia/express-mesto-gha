const mongoose = require('mongoose');

/** Схема пользователя
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, any>}
 * name - имя пользователя, about - подпись пользователя, avatar - ссылка на аватар
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
