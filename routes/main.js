const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/', (req,res,next) => {
  res.render('main',{pageTitle: '一小财务管理系统'});
});

module.exports = router;