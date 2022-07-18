const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const {
  updateProfile,
  updateAvatar,
  getUserProfile,
  getUsers,
  getUsersById,
} = require('../controllers/user');
const validateURL = require('../utils/validateURL/validateURL');

userRouter.get('/', getUsers);

userRouter.get('/me', getUserProfile);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUsersById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(20),
    about: Joi.string().required().min(2).max(20),
  }),
}), updateProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}), updateAvatar);

module.exports = userRouter;
