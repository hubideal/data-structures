var request = require('request');
const { Client } = require('pg');

// PARTICLE PHOTON
var device_id = "39002b000247353137323334"; //process.env.PHOTON_ID;
var access_token = "ff90e7b06a6dc44ec56dd14987a34b57a20d68d8"; //process.env.PHOTON_TOKEN;
var particle_variable = 'json';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;//or json or particle_tilt

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'hubdata';
db_credentials.host = "hubsensor.codfsrmcdblh.us-east-1.rds.amazonaws.com"; //process.env.AWSRDS_EP;
db_credentials.database = 'pugSensor';
db_credentials.password = 'Datavisual'; //process.env.AWSRDS_PW;
db_credentials.port = 5432;

var getAndWriteData = function() {
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        // Store sensor values in variables
        var device_json_string = JSON.parse(body).result;
        var hall = JSON.parse(device_json_string).hall;
        var tilt = JSON.parse(device_json_string).tilt;
        var hallB;
        var tiltB;
        
        if (hall===1) {
            hallB="TRUE";
        }
        else {
            hallB="FALSE"
        }
        
        if (tilt===1) {
            tiltB="TRUE";
        }
        else {
            tiltB="FALSE"
        }

        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO pugdata VALUES (" + hallB + "," + tiltB + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);