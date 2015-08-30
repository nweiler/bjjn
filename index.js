var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var api = {};
module.exports = api;

var url = 'mongodb://localhost:27017/entries'

MongoClient.connect(url, function(e, db) {
  assert.equal(null, e);
  console.log("Connected to Mongo");
	api.create(db, function(e, d) { 
		api.read(db, function(e, d) {
			e == undefined ? console.log(d) : console.log(e);
			db.close();
		});
	});
});

api.create = function(db, cb) {
  db.collection('entries').insertOne(
  	{
      'date': '1/1/15',
      'location': 'RJJA Michiana',
      'instructor':' Gary Briscoe',
      'time': '6:30 PM',
      'moves': [],
      'rounds': 4,
      'notes': 'n/a'
    },
    function(e, d) {
      assert.equal(e, null);
			e || cb(e);
			cb(d);
		}
	)
}

api.read = function(db, cb) {
	db.collection('entries').find({}).toArray(
	function(e, d) {
		e || cb(e);
		cb(d);
	})
}


api.update = function(db, cb) {
	db.collection('entries').update({ /* TODO */ },
	function(e, d) {
		e || cb(e);
		cb(d);
	})
}

api.delete = function(db, cb) {
	db.collection('entries').remove({ /* TODO */ },
	function(e, d) {
		e || cb(e);
		cb(d);
	})
}

