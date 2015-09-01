var assert = require('assert');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var api = {};
module.exports = api;

var url = 'mongodb://localhost:27017/entries'

MongoClient.connect(url, function(e, db) {
  assert.equal(null, e);
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

  async.series(
    [
      function(cb) { api.create(db, entry, cb); },
      function(cb) { api.read(db, cb); }
      function(cb) { api.delete(db, del_entry, cb); }
    ],
    function(e, d) {
			e == undefined ? console.log(d) : console.log(d);
			db.close();
	});
});


// ======== ROUTES ======== \\
api.create = function(db, entry, cb) {
  db.collection('entries').insertOne(entry, cb);
}

api.read = function(db, cb) {
	db.collection('entries').find({}).toArray(cb);
}

api.update = function(db, entry, cb) {
	db.collection('entries').update(entry, cb);
}

api.delete = function(db, entry, cb) {
	db.collection('entries').remove(entry, cb);
}

