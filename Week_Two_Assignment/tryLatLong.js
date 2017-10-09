var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY;
var addressData = [];
var meetingsData = [];
var fullArray = JSON.parse(fs.readFileSync('aaSchedule.json', 'utf8'));
var count = fullArray.length;
for (var i=0; i<count; i++) {
    var latLongAdd = fullArray[i].streetAddress;
    addressData.push(latLongAdd);
}

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(latLongAdd, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);
}, function() {
    console.log(meetingsData);
});