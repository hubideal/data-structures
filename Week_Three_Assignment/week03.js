//from week two, I used the following code to write the file to a json:  fs.writeFileSync('addArray.json', JSON.stringify(data2));

var fs = require('fs');
var request = require('request'); // use to make HTML calls
var async = require('async'); // use to work with asynchronous JavaScript

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export GMAKEY="api key"  - directed on the terminal
// printenv | grep GMAKEY  -- used on the terminal

var apiKey = process.env.GMAKEY;  //  used to conceal my API Key

var meetingsData = [];
var addresses = JSON.parse(fs.readFileSync('addArray.json', 'utf8')); //converted array from week two to a json file



// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;  //used to gather data from the json file addArray
    var thisMeeting = new Object;  //create new object 
    thisMeeting.streeAddress = value;  
    request(apiRequest, function(err, resp, body) {  //enters address from addArray json file to Google Maps
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;  //enters latlong to jsonfile
        thisMeeting.googleAdd = JSON.parse(body).results[0].formatted_address; //enters google formated address to json file
        meetingsData.push(thisMeeting);  //pushes latLong and googleAdd to meetingsData array
    });
    setTimeout(callback, 2000);  //creates a pause so data can be collected
}, function() {
    fs.writeFileSync('meetingsData.json', JSON.stringify(meetingsData)); //creates meetingsData into a json file
});