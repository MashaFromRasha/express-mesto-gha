// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const mongoose = require("mongoose");


// eslint-disable-next-line no-undef, no-unused-vars
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();


// Подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт слушает приложение.
//eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello');
// });