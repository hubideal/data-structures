//This file was used to insert data into a mongo database. 

var request = require('request');

// IN my MONGO shell, there exists a database  'newSchoolEnt' with a collection `entrepreneurs`
var dbName = 'newSchoolEnt'; // name of Mongo database (created in the Mongo shell)
var collName = 'entrepreneurs'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data from I github site that I created (used the "raw" feature in git hub)
// Insert the list of meeting data (contained in an array) in the Mongo collection
request('https://raw.githubusercontent.com/hubideal/data-structures/master/EntrepreneurGenome/wikiParsonsFound.json', function(error, response, body) {
    var entrepreneurList = JSON.parse(body);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; 

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(entrepreneurList);
        db.close();

    }); //MongoClient.connect

}); //request