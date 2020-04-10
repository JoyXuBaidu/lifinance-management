const express = require("express");
const router = express.Router();

const addRecordsController = require('../controllers/addrecord');

router.get('/addrecord/:userId',addRecordsController.addRecordPage);

router.post('/postrecord/:userId',addRecordsController.postRecord);

module.exports = router;