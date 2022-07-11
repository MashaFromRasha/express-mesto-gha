const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Были переданы некорректные данные карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new Error('Error'))
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        next(new ForbiddenError('Нельзя удалить чужую.'));
      } else {
        Card.deleteOne(card).then(() => res
          .status(200)
          .send({ message: `Карточка с id ${card.id} удалена успешно.` }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Ошибка в запросе.'));
      } else if (err.message === 'Error') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Error'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (err.message === 'Error') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Error'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
      } else if (err.message === 'Error') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
