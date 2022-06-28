const express = require('express');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62b4a74a14d4348f77b115ee', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Произошла ошибка на сервере' : error.message });
});

// eslint-disable-next-line no-unused-vars
app.use((req, res) => {
  res.status(404).send({ message: '404 Not Found' });
});

app.listen(PORT, () => {
  // В консоли вывод порта
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
