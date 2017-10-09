//using my code from week3
var trackCount = 0;
var fs = require('fs');
var request = require('request'); // use to make HTML calls
var async = require('async'); // use to work with asynchronous JavaScript

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export GMAKEY="api key"  - directed on the terminal
// printenv | grep GMAKEY  -- used on the terminal

var apiKey = process.env.GMAKEY;  //  used to conceal my API Key

var latLongData = [];
var addresses = JSON.parse(fs.readFileSync('aaFinalDB.json','utf8')); //converted array from week two to a json file


// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback){ 
    var thisMeeting = new Object;  //create new object 
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.streetSplit + '&key=' + apiKey;  //used to gather data from the json file addArray
    
    
    
    request(apiRequest, function(err, resp, body) {  //enters address from addArray json file to Google Maps
        if (err) {throw err;}
        if(JSON.parse(body).results.length == 0){
            
        }
        else{
            value.latLong = JSON.parse(body).results[0].geometry.location;  //enters latlong to jsonfile
            value.googleAdd = JSON.parse(body).results[0].formatted_address; //enters google formated address to json file   
        }
        
        latLongData.push(value);  //pushes latLong and googleAdd to meetingsData array
        console.log(value)
        console.log("now: " + trackCount)
        trackCount++;
        
    });
    setTimeout(callback, 500);  //creates a pause so data can be collected
}, function() {
    fs.writeFileSync('finalMeetingsData.json', JSON.stringify(latLongData)); //creates meetingsData into a json file
});