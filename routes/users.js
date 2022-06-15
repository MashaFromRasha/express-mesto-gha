/* eslint-disable no-undef */
//Создание express router
const router = require("express").Router();
const {getUsers, getUserById, createUser} = require('../controllers/users');


router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);


//Экспорт
module.exports = router;