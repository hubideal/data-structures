
var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export GMAKEY="AIzaSyA5gg9BiwXkhg-FwsjFpTRyAgCtb4wXl2E"
// printenv | grep GMAKEY

var apiKey = process.env.GMAKEY;   

var meetingsData = [];
var addresses = JSON.parse(fs.readFileSync('addArray.json', 'utf8'));



// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey; 
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        thisMeeting.googleAdd = JSON.parse(body).results[0].formatted_address;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('meetingsData.json', JSON.stringify(meetingsData));
});