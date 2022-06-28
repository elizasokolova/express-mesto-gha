const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это поле обязательно'],
    minlength: [2, 'Имя должно быть от 2 до 30 символов'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Имя должно быть от 2 до 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Это поле обязательно'],
    minlength: [2, 'Описание должно быть от 2 до 30 символов'],
    maxlength: [30, 'Описание должно быть от 2 до 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Это поле обязательно'],
  },
});

module.exports = mongoose.model('user', userSchema);
