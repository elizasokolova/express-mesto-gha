const mongoose = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next(new InternalServerError('Произошла ошибка')));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const message = Object.entries(error.errors)
          .map(([errorName, errorMessage]) => `${errorName}: ${errorMessage}`)
          .join('; ');
        next(new BadRequestError(message));
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new mongoose.Error.DocumentNotFoundError();
      } else {
        return res.status(200).send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Ошибка запроса'));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // валидация данных перед изменением
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const message = Object.entries(error.errors)
          .map(([errorName, errorMessage]) => `${errorName}: ${errorMessage}`)
          .join('; ');
        next(new BadRequestError(message));
      } else if (error.name === 'CastError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // валидация данных перед изменением
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const message = Object.entries(error.errors)
          .map(([errorName, errorMessage]) => `${errorName}: ${errorMessage}`)
          .join('; ');
        next(new BadRequestError(message));
      } else if (error.name === 'CastError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(new InternalServerError());
      }
    });
};
