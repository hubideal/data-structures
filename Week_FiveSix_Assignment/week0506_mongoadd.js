var request = require('request');

// IN MONGO exists a database `aaMeetingData` with a collection `newSchedule`
var dbName = 'aaNewData'; // name of Mongo database (created in the Mongo shell)
var collName = 'newSchedule'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data from I github site that I created (used the "raw" feature in git hub)
// Insert the list of meeting data (contained in an array) in the Mongo collection
request('https://raw.githubusercontent.com/hubideal/data-structures/master/Week_FiveSix_Assignment/finalMeetingsData.json', function(error, response, body) {
    var completeMeetDB = JSON.parse(body);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; 

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(completeMeetDB);
        db.close();

    }); //MongoClient.connect

}); //request