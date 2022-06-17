const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use((req, res, next) => {
  req.user = {
    _id: '62ab276cf3b5e1bae4b59b4e',
  };
  next();
});

app.use(cardsRouter);
app.use(usersRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Ошибка 404. Запрашиваемый ресурс не найден.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
