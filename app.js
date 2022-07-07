const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

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
