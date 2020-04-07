const express = require('express');
const router = express.Router();
const {addUser, loginUser, getAllUsers, toggleDisable} = require('../controller/userController');

router.post('/register', addUser);
router.post('/login', loginUser);
router.get('/basic-users', getAllUsers);
router.put('/basic-users/:_id?', toggleDisable)

module.exports = router;