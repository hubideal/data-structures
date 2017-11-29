

// "_id": "59f53d8c1f2d4f31d49d64bd",
//         "id": 519673,
//         "streetAddress": "484 West 43rd Street, New York, NY",
//         "streetSplit": "484+West+43rd+Street,+New+York,+NY",
//         "meetingTitle": "POWERLESS - Powerless",
//         "buildingName": "Manhattan Plaza Health Club",
//         "roomFloor": " 1st Floor",
//         "accessibility": true,
//         "meetingNotes": "All meetings are non-smoking.",
//         "meetingDay": "Tuesdays",
//         "startTimeWeb": "7:00 PM",
//         "endTimeWeb": "8:00 PM",
//         "startHourQ": 19,
//         "startMinQ": 0,
//         "endHourQ": 20,
//         "endMin": 0,
//         "meetType": "Step Meeting",
//         "specialInterest": "",
//         "latLong": {
//             "lat": 40.759952,
//             "lng": -73.9947467
//         },
//         "googleAdd": "484 W 43rd St, New York, NY 10036, USA"
//     },

var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('dataOUtput/output10.txt');

//create object to load content 
var $ = cheerio.load(content);

var completeMeetDB = JSON.parse(body);

for 


function enterMeeting(_meetingId, _weekday, _pStartTime, _pEndTime, _startHour, _startMin, _endHour, _endMin, _meetingType, _special) {
    var private = {}; 
            private.meetId = id;
            private.weekday = meetingDay;
            private.StartTime = startTimeWeb;
            private.EndTime = endTimeWeb;
            private.startHour = startHourQ;
            private.startMin = startMinQ;
            private.endHour = endHourQ;
            private.endMin = endMin;
            private.meetingType = meetType;
            private.special = specialInterest;
            return private;
          //needs to happen outside the function
          } 