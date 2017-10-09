var fs = require('fs');

var dbName = 'aaNewData';
var collName = 'newSchedule';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;



var myQuerry = [
    { $match: { meetingDay : 'Tuesdays', startHourQ : { $gte : 19 }}},
    ];
// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

    // Select three Citibike stations
    collection.aggregate(myQuerry).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('mongo_aaSearchResult.JSON', JSON.stringify(docs, null, 4));
        }
        db.close();
        
    });

}); //MongoClient.connect