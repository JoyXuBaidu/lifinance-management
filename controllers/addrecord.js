const path = require('path');

const db = require('../util/database');
const tokenHelper = require('../util/token');

exports.addRecordPage = async function (req,res,next){
  let flag = false;
  await tokenHelper.validToken(req.params.userId).catch(()=>{
    res.redirect('/');
    flag=true;
  })
  if(flag) return;
  res.sendFile(path.join(__dirname,'../','views','addRecord.html'));
}

exports.postRecord = async function (req,res,next) {
  tokenHelper.validToken(req.params.userId).then(()=>{
    let postData = req.body;
    db.execute(`insert into records (buyerName,item,money,buydate) values ("${postData.username}","${postData.item}","${postData.money}","${postData.date}");`)
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