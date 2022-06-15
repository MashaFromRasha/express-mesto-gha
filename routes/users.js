// Создание express router
/* eslint-disable no-undef */
const router = require("express").Router();

// Экспорт
module.exports = router;

const users = require("./users.js");

router.get("/users/:id", (req, res) => {
  if(!users[req.res.params]) {
    res.send({error: 'Такого пользователя не существует'});
  }
   res.send(users[req.params.id]);
});