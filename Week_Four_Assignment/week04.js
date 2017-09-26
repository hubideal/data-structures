// after several attempts to insert a list of meeting sites from zone 4 to the MongoDB, I decided that I needed to create a website with the JSON information about each meeting.  
//Then I realized that I could create a json website with all of the Zone 4 meeting data (from week one) to git hub.  
//Therefore, I created a website of json (called meet array to my json account).  Then I created the Mongo Shell, and ran the following code.  
//I plan to continue and create sites for the other zones and insert those "documents" to MongoDB as well.  

var request = require('request');

// IN MONGO exists a database `aaMeetingData` with a collection `meetSchedule`
var dbName = 'aaMeetingData'; // name of Mongo database (created in the Mongo shell)
var collName = 'meetSchedule'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data from I github site that I created (used the "raw" feature in git hub)
// Insert the list of meeting data (contained in an array) in the Mongo collection
request('https://raw.githubusercontent.com/hubideal/data-structures/master/Week_Three_Assignment/meetingsData.json', function(error, response, body) {
    var aaMeetData = JSON.parse(body);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; 

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(aaMeetData);
        db.close();

    }); //MongoClient.connect

}); //request