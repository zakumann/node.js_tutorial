var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://gundam:12345@mydb.3qwsgdv.mongodb.net/test";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
});