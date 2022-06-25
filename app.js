const express = require('express');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.user = {
        _id: '62b4a74a14d4348f77b115ee', // вставьте сюда _id созданного в предыдущем пункте пользователя
    };
    next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);

// eslint-disable-next-line no-unused-vars
app.use((req, res) => {
    res.status(404).send({ message: '404 Not Found' });
});

app.listen(PORT, () => {
    // В консоли вывод порта
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
});