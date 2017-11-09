var express = require('express'),
    app = express();
const { Pool } = require('pg');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'hubdata';
db_credentials.host = '';
db_credentials.database = 'pugSensor';
db_credentials.password = '';
db_credentials.port = 5432;

app.get('/', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM timehalltilt AT TIME ZONE 'America/New_York') as sensorday, 
             EXTRACT(MONTH FROM timehalltilt AT TIME ZONE 'America/New_York') as sensormonth, 
             count(*) as num_obs,
             count(tilt) FILTER (WHERE tilt = TRUE) AS closed,
             count(hall) FILTER (WHERE hall = TRUE) AS closed
             FROM pugdata
             GROUP BY sensormonth, sensorday;`;
             
    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

app.listen(3000, function() {
    console.log('Server listening...');
});
