const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/home', function (req,res,next) {
  res.send("HIHI");
});

module.exports = router;