/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const User = require('../models/user');


//Возвращаение всех юзеров
const getUsers = (req, res) => User.find({})
  .then(users => res.status(200).send(users))
  .catch(err => res.status(500).send({ message: `Запрашиваемый ресурс не найден. Ошибка ${err}` }));


//Возвращение пользователя по _id
const getUserById = (req, res) => User.findById(req.params.id)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(500).send({ message: `Запрашиваемый пользователь не найден. Ошибка ${err}` }));


//Создание пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body; //Получение из объекта запроса имя, описание и аватар пользователя
  console.log(req.body);

  return User.create({ name, about, avatar }) //Создание документа на основе пришедших данных
    .then(user => res.status(200).send(user))  //Возврат записанных в базу данные
    .catch(err => res.status(500).send({ message: `Ошибка при создании пользователя. Ошибка ${err}` }));
};


module.exports = {
  getUsers, getUserById, createUser
};