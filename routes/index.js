var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://user:password@cluster0-xlopf.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(url);

const readTweets = (resolve, reject) => {
  client.connect((err) => {
    if (err){
      reject(err);
      throw err;
    }
    let db = client.db('DavidDb');
    let colTweets = db.collection('Tweets');
    colTweets.find({}).toArray((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};


/* GET tweets. */
router.get('/tweets', function(req, res) {
  readTweets(
    (data) => res.json(data),
    (err) => res.send(err));
});

module.exports = router;
