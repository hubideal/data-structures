//using my code from week3
var trackCount = 0;
var fs = require('fs');
var request = require('request'); // use to make HTML calls

var fs = require('fs');
var cheerio = require('cheerio');
var meetings=[];


var content = JSON.parse(fs.readFileSync('Zone10Unclean.json','utf8')); //

//create object to load content 


content.forEach( function(d, i) {
    var newTitle = d.meetingTitle.split("-", 1);
    console.log(newTitle);
    meetings.push(new enterData(d.id, d.streetAddress, d.streetSplit, d.meetingTitle, newTitle[0], d.buildingName, d.roomFloor, d.accessibility, d.meetingNotes, d.meetingDay, d.startTimeWeb, d.endTimeWeb, d.startHourQ, d.startMinQ, d.endHourQ, d.endMin, d.meetType, d.specialInterest, d.latLong, d.googleAdd));
});

fs.writeFileSync('cleanZone10.json', JSON.stringify(meetings)); //creates meetingsData into a json file

function enterData(_id, _streetAddress, _streetSplit, _meetingTitle, _newTitle, _buildingName, _roomFloor, _accessibility, _meetingNotes, _meetingDay, _startTimeWeb, _endTimeWeb, _startHourQ, _startMinQ, _endHourQ, _endMin, _meetType, _specialInterest, _latLong, _googleAdd){
      var private = {}; //I probably could have used this instead of the private name, but its something similar I did for another project so I used it here.  
            private.id = _id;
            //private.addresInfo = _aaLocation;
            private.streetAddress = _streetAddress;
            private.streetSplit = _streetSplit;
            private.meetingTitle = _meetingTitle;
            private.newTitle = _newTitle;
            private.buildingName = _buildingName;
            private.roomFloor = _roomFloor;
            private.accessibility = _accessibility;
            private.meetingNotes = _meetingNotes;
            private.meetingDay = _meetingDay;
            private.startTimeWeb = _startTimeWeb;
            private.endTimeWeb = _endTimeWeb;
            private.startHourQ = _startHourQ;
            private.startMinQ = _startMinQ;
            private.endHourQ = _endHourQ;
            private.endMin = _endMin;
            private.startHourQ = _startHourQ;
            private.meetType = _meetType;
            private.specialInterest = _specialInterest;
            private.latLong = _latLong;
            private.googleAdd= _googleAdd;
            return private;
          //needs to happen outside the function
          }


// eachSeries in the async module iterates over an array and operates on each item in the array in series
