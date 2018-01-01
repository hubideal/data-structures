//This program was used to create the JSON file from the complete and combined Mongo Database

var fs = require('fs');

var dbName = 'newSchoolEnt'; // name of Mongo database (created in the Mongo shell)
var collName = 'entrepreneurs'; // name of Mongo collection (created in the Mongo shell)

// Connection URL to the Mongo Database
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

// var myQuerry = [
//     { $match: { match terms could be added here if needed}},
//     ];
// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

//using the following code to add the collection to an array that is then created into a json file

    collection.aggregate().toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('combinedTNSParson.JSON', JSON.stringify(docs, null, 4));
        }
        db.close();
        
    });

}); //MongoClient.connect