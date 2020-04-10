const express = require('express');

const usersController = require("../controllers/users");
const homepageController =require("../controllers/homepage");
const router = express.Router();

router.get('/home/:userId', homepageController.getLoginToHome);//.......

router.post('/home/:userId', homepageController.postLoginToHome); //Put the more specific routers before the dynamic route part

module.exports = router;