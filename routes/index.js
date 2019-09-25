var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;


const url = process.env.BD;

const client = new MongoClient(url);

const getDatabaseInfo = (database, offset, limit ,resolve, reject) => {
  client.connect((err) => {
    if (err){
      reject(err);
      throw err;
    }
    let db = client.db('DavidDb');
    let colTweets = db.collection(database);
    colTweets.find({}).skip(offset).limit(limit).toArray((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};


/* GET tweets. */
router.get('/:database', function(req, res) {
  var database = req.params.database;
  var offset = req.query.$offset ? req.query.$offset : 0;
  var limit = req.query.$limit ? req.query.$limit : 100 ;
  getDatabaseInfo(
    database,
    parseInt(offset),
    parseInt(limit),
    (data) => res.json(data),
    (err) => res.send(err));
});

module.exports = router;
