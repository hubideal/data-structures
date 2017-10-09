var fs = require('fs');

var dbName = 'citibike';
var collName = 'stations';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

var myQuerry = [
    //{$match : { statusValue : "In Service"}},
    //{ $match: {availableDocks : { $lt : 1 }}},
    //{ $group: { _id : '$statusValue', stationName : { $push : 'stationName' }}},
    { $match : {}}
    ];

// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

    // Select three Citibike stations
    collection.aggregate( myQuerry).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('mongo_aggregation_result.JSON', JSON.stringify(docs, null, 4));
        }
        db.close();
        
    });

}); //MongoClient.connect