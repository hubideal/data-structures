// npm install mongodb

var request = require('request');

// IN MONGO exists a database `citibike` with a collection `stations`
var dbName = 'aaMeetingData'; // name of Mongo database (created in the Mongo shell)
var collName = 'schedule'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data on citibike stations
// Insert the list of citibike stations (contained in an array) in the Mongo collection
request('https://raw.githubusercontent.com/hubideal/data-structures/master/Week_One_Assignment/data/output04.txt', function(error, response, body) {
    var aaMeetData = JSON.parse(body);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; 

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(aaMeetData.tbody);
        db.close();

    }); //MongoClient.connect

}); //request