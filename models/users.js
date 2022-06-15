// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

// Описание схемы пользователя:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('user', userSchema);