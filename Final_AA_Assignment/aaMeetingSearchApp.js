var fs = require('fs');

var dbName = 'steve';
var collName = 'meetings';

// Connection URL
var url = 'mongodb://hubbs654:V2hYRNpJ8VNAMai6@cluster0-shard-00-00-rzdcl.mongodb.net:27017,cluster0-shard-00-01-rzdcl.mongodb.net:27017,cluster0-shard-00-02-rzdcl.mongodb.net:27017/steve?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';



var myQuerry = [
    { $match: { $or: [{meetingDay : 'Tuesdays', startHourQ : { $gte : 19 }}, { meetingDay : 'Wednesdays', startHourQ : { $lte : 4 } }] }}
    ];
// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

    collection.aggregate(myQuerry).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('mongo_aaSearchResult.JSON', JSON.stringify(docs, null, 4));
        }
        db.close();
        
    });

}); //MongoClient.connect

