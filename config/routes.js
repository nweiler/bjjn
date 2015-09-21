
var users = require('./users');
var entries = require('./entries');

module.exports = function(app, passport) {

  app.get('/', users.login);
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

