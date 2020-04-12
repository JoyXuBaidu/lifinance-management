const path = require('path');

const db = require('../util/database');
const tokenHelper = require('../util/token');
const Record = require('../models/record');

const recordHelper = new Record();

exports.addRecordPage = async function (req,res,next){
  let flag =false;
  await tokenHelper.returnToMainPage(req.params.userId,res).catch(()=>{flag= true;});
  if(flag) return;
  res.sendFile(path.join(__dirname,'../','views','addRecord.html'));
}

exports.postRecord = function (req,res,next) {
  tokenHelper.validToken(req.params.userId).then(()=>{
    let postData = req.body;
    recordHelper.setRecords(postData)
    .then(()=>{console.log('ajax');res.sendStatus(200);return;})
    .catch(err => {
    console.log(err);
    res.sendStatus(500); return;
  });
  }).catch((err)=>{
    console.log(`addrecord: ${String(err)}`);
    if(String(err).indexOf('jwt expired')!=-1){
      res.append('loginstatus','logintimeout');
    }
    res.sendStatus(500);
    return;});
}