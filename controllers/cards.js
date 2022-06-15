/* eslint-disable no-undef */
const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then(cards => res.status(200).send(cards))
  .catch(err => res.status(500).send({ message: `Запрашиваемый ресурс не найден. Ошибка ${err}` }));


const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.body);

  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then(card => res.status(200).send(card))
    .catch(err => res.status(500).send({ message: `Ошибка при создании карточки. Ошибка ${err}` }));
};


const deleteCard = (req, res) => {
  const { cardID } = req.params;
  return Card.findByIdAndRemove(cardID)
    .then(card => res.status(200).send(card))
    .catch(err => res.status(500).send({ message: `Ошибка при удалении карточки. Ошибка ${err}` }));
};


module.exports = {
  getCards, createCard, deleteCard
}