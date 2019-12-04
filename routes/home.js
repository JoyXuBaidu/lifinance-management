const express = require('express');

const usersController = require("../controllers/users");
const router = express.Router();

router.get('/home', usersController.getLoginToHome);

router.post('/home', usersController.postLoginToHome);

module.exports = router;