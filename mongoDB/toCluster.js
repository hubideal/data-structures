var fs = require('fs');

var meetings = JSON.parse(fs.readFileSync('aaMeetingCluster.JSON'));

// Connection URL
// var url = 'mongodb://' + process.env.IP + ':27017/aa';
var url = 'mongodb://hubbs654:V2hYRNpJ8VNAMai6@cluster0-shard-00-00-rzdcl.mongodb.net:27017,cluster0-shard-00-01-rzdcl.mongodb.net:27017,cluster0-shard-00-02-rzdcl.mongodb.net:27017/steve?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin:27017/aa';

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection('meetings');

    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    collection.insert(meetings);
    db.close();

}); //MongoClient.connect