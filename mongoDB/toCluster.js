var fs = require('fs');

var meetings = JSON.parse(fs.readFileSync('aaMeetingCluster.JSON'));


var url = process.env.ATLAS;


var MongoClient = require('mongodb').MongoClient; 

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection('aaMeetings');

    collection.insert(meetings);
    db.close();

}); 