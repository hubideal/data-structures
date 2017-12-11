var request = require('request');
const { Client } = require('pg');

// PARTICLE PHOTON
//Variables below are used to retrieve information back from the sensor's url.  I kept my device id public and my token private.    
var device_id = '39002b000247353137323334';
var access_token = process.env.PHOTON_TOKEN; //IMPORTANT when entering into the terminal export PHOTON_TOKEN=##### - REMOVE quote marks!!!
var particle_variable = 'json';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;//or json or particle_tilt

// AWS RDS POSTGRESQL INSTANCE
//The variables below refer to my AWS account.   This will allow me to add data to the Postgresql.  I kpet my host endpoint and password private.   
var db_credentials = new Object();
db_credentials.user = 'hubdata';
db_credentials.host = process.env.AWSRDS_EP;  //IMPORTANT when entering into the terminal export AWSRDS_EP=##### - REMOVE quote marks!!!
db_credentials.database = 'pugSensor';
db_credentials.password = process.env.AWSRDS_PW;  //IMPORTANT when entering into the terminal export AWSRDS_PS=##### - REMOVE quote marks!!!
db_credentials.port = 5432;

//This is the code that requests data from my device url, and it INSERTS values into my postgresql.  Both of my values are Booleans. 
var getAndWriteData = function() {
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        // Store sensor values in variables
        var device_json_string = JSON.parse(body).result;
        var hall = JSON.parse(device_json_string).hall;
        var tilt = JSON.parse(device_json_string).tilt;
        var hallB;
        var tiltB;
        
        //In the code below, I had to create my integer values 1 and 0 to text True and False to add appropriately to Postgresql.  
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

        //This code INSERTS VALUES into the pugdata table in Postgresql. 
        var thisQuery = "INSERT INTO pugdata VALUES (" + hallB + "," + tiltB + ", DEFAULT);";
        //console.log(thisQuery); for debugging - not needed

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);