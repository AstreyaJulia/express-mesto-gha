const mongoose = require('mongoose');

/** Схема карточки
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, any>}
 * name - название, link - ссылка на изображние, owner - владелец карточки,
 * likes - массив лайков, createdAt - дата создания
 */
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
