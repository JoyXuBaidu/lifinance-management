const express = require('express');

const router = express.Router();
const usersController = require("../controllers/users");

router.get('/', usersController.getLoginInfo);

module.exports = router;