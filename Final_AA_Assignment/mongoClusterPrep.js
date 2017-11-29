var fs = require('fs');

var dbName = 'finalDataAA'; 
var collName = 'collectionAA';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;


var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);


    collection.aggregate([{ $limit : 3000 }]).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('aaMeetingCluster.JSON', JSON.stringify(docs, null, 4));
        }
        db.close();
        
    });

});