/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const User = require('../models/user');

//Возвращаение всех юзеров
const getUsers = (req, res) => User.find({})
  .then(users => res.status(200).send(users))
  .catch(err => res.status(500).send({ message: `Запрашиваемый ресурс не найден. Код ошибки ${err}` }));


//Возвращение пользователя по _id
const getUserById = (req, res) => User.findById(req.params.id)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(500).send({ message: `Запрашиваемый пользователь не найден. Код ошибки ${err}` }));

//Создание пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body; //Получение из объекта запроса имя, описание и аватар пользователя

  return User.create({ name, about, avatar }) //Создание документа на основе пришедших данных
    .then(user => res.status(200).send(user))  //Возврат записанных в базу данные
    //если данные не записались, вернем ошибку
    .catch(err => res.status(500).send({ message: `Ошибка при создании пользователя. Код ошибки ${err}` }));
}


module.exports = {
  getUsers, getUserById, createUser
};