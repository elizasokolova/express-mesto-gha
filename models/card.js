const mongoose = require('mongoose');
const { isURL } = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это поле обязательно'],
    minlength: [2, 'Название должно быть от 2 до 30 символов'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Название должно быть от 2 до 30 символов'], // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: [true, 'Это поле обязательно'],
    validate: {
      validator: (value) => isURL(value, { protocols: ['http', 'https', 'ftp'], require_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Это поле обязательно'],
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
