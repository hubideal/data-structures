require('express'),
    app = express();
var fs = require('fs');

var moment = require('moment-timezone'); // npm install moment-timezone

// Postgres
const { Pool } = require('pg');
var db_credentials = new Object();
db_credentials.user = 'hubdata';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'pugSensor';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Mongo
var collName = 'newMeetings'; //changed from "meetings"
var MongoClient = require('mongodb').MongoClient;
var url = process.env.ATLAS;

// HTML wrappers for AA data
var index1 = fs.readFileSync("index1.txt");
var index3 = fs.readFileSync("index3.txt");
console.log(url);

app.get('/', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM timehalltilt AT TIME ZONE 'America/New_York') as sensorday,
             EXTRACT(MONTH FROM timehalltilt AT TIME ZONE 'America/New_York') as sensormonth,
             count(*) as num_obs,
             count(tilt) FILTER (WHERE tilt = TRUE) AS puginside,
             count(hall) FILTER (WHERE hall = TRUE) AS puglatch
             FROM pugdata
             GROUP BY sensormonth, sensorday;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

app.get('/aa', function(req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        var dayWeek = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
        var dateTimeNow = new Date();
        var today = dayWeek[moment.tz(new Date(), "America/New_York").days()];
        var tomorrow;
        if (today == 'Saturdays') {tomorrow = "Sundays";}
        else {tomorrow = dayWeek[(moment.tz(new Date(), "America/New_York").days())+1]}
        var hour = moment.tz(new Date(), "America/New_York").hours();
        console.log(tomorrow);

        var collection = db.collection(collName);

        collection.aggregate([ // start of aggregation pipeline
            // match by day and time
            { $match :
                { $or : [
                    { $and: [
                        { meetingDay : today } , { startHourQ : { $gte: hour } }
                    ]},
                    { $and: [
                        { meetingDay : tomorrow } , {  startHourQ : { $lte: 4 } }
                    ]}
                ]}
            },

            // group by meeting group
            { $group : { _id : {
                latLong : "$latLong",
                meetingName : "$newTitle",
                meetingAddress1 : "$streetAddress",
                meetingAddress2 : "$roomFloor",
                googleAddress : "$googleAdd",
                meetingDetails : "$meetingNotes",
                meetingWheelchair : "$accessibility",
                },
                    meetingDay : { $push : "$meetingDay" },
                    meetingStartTime : { $push : "$startTimeWeb" },
                    meetingType : { $push : "$meetType" },
                    meetingSpecial: { $push: "$specialInterest" },
            }
            },

            // group meeting groups by latLong
            {
                $group : { _id : {
                    latLong : "$_id.latLong"},
                    meetingGroups : { $push : {groupInfo : "$_id", meetingDay : "$meetingDay", meetingStartTime : "$meetingStartTime", meetingType : "$meetingType" }}
                }
            }

            ]).toArray(function(err, docs) { // end of aggregation pipeline
            if (err) {console.log(err)}

            else {
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(index1);
                res.write(JSON.stringify(docs));
                res.end(index3);
            }
            db.close();
        });
    });

});

// app.listen(process.env.PORT, function() {
app.listen(4000, function() {
    console.log('Server listening...');
});
