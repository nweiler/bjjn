var assert = require('assert');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var router = express.Router();

app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

var api = {};
module.exports = api;

var url = 'mongodb://localhost:27017/entries'

MongoClient.connect(url, function(e, db) {
  if (e) return console.log(e);
  console.log("Connected to Mongo");

  var entry = {
    'date': '1/1/15',
    'location': 'RJJA Michiana',
    'instructor':' Gary Briscoe',
    'time': '6:30 PM',
    'moves': [],
    'rounds': 4,
    'notes': 'n/a'
  };
  
  var del_entry = {
    'date': '1/1/15'
  };

  app.get('/', function(req, res) {
    api.read_all(db, function(err, data) {
      res.render('index', data);
      //console.log(data);
      //res.send(data);
    });
  });
  
  app.get('/add', function(req, res) {
    api.create(db, entry, function(err, data) {
      api.read_all(db, function(err, data) {
        //console.log(data);
        res.send(data);
      });
    });
  });

  app.get('/update', function(req, res) {
    api.update(db, entry, function(err, data) {
      api.read_all(db, function(err, data) {
        //console.log(data);
        res.send(data);
      });
    });
  });


  app.get('delete', function(res, res) {
    api.delete(db, entry, function(err, data) {
      api.read_all(db, function(err, data) {
        //console.log(data);
        res.send(data);
      });
    });
  });
});


app.listen(3000, function() {
  console.log('App listening on port 3000');
});


// ======== ROUTES ======== \\
api.create = function(db, entry, cb) {
  db.collection('entries').insertOne(entry, cb);
}

api.read_all = function(db, cb) {
	db.collection('entries').find({}).toArray(cb);
}

api.read = function(db, entry, cb) {
	db.collection('entries').find(entry).toArray(cb);
}

api.update = function(db, entry, cb) {
	db.collection('entries').update(entry, cb);
}

api.delete = function(db, entry, cb) {
	db.collection('entries').remove(entry, cb);
}

