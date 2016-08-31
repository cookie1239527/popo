var express = require('express');
var mongodb = require('mongodb');
var app = express();
var mongodbURL = 'mongodb://dbuser:1234@ds013004.mlab.com:13004/gcmtell';
var myDB;
mongodb.MongoClient.connect(mongodbURL, function(err, db) {
if (err) {
console.log(err);
} else {
	myDB = db;
console.log('connection success');
}
});

app.get('/api/test', function(request, response) {
var collection = myDB.collection('my_data');
collection.find({}).toArray(function(err, docs) {
if (err) {
response.status(406).end();
} else {
response.type('application/json');
response.status(200).send(docs);
response.end();
}
});
});
app.listen(5000);
