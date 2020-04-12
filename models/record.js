const db = require('../util/database');

class Record {
  getRecords (username) {
    return db.execute(`select * from records where buyerName='${username}';`);
  }

  setRecords (postData) {
    return db.execute(`insert into records (buyerName,item,money,buydate) values ("${postData.username}","${postData.item}","${postData.money}","${postData.date}");`);
  }
}

module.exports = Record;