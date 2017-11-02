var express = require('express'),
    app = express();
const { Pool } = require('pg');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'hubdata';
db_credentials.host = 'hubsensor.codfsrmcdblh.us-east-1.rds.amazonaws.com';  //IMPORTANT when entering into the terminal export AWSRDS_EP=##### - REMOVE quote marks!!!
db_credentials.database = 'pugSensor';
db_credentials.password = 'Datavisual';  //IMPORTANT when entering into the terminal export AWSRDS_PS=##### - REMOVE quote marks!!!
db_credentials.port = 5432;

app.get('/', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM timehalltilt AT TIME ZONE 'America/New_York') as sensorday, 
             EXTRACT(MONTH FROM timehalltilt AT TIME ZONE 'America/New_York') as sensormonth, 
             count(*) as num_obs
             FROM pugdata 
             GROUP BY sensormonth, sensorday;`;
             
    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

app.listen(process.env, function() {
    console.log('Server listening...');
});


//count(tilt) as num_tilt, 
//             count(hall) as num_hall