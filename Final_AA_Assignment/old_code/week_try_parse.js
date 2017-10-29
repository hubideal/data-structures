var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('dataOUtput/output07.txt');

//create object to load content 
var $ = cheerio.load(content);

//create an array to push content
var aaMeetingArray= [];

var building; //created global variables of the location information
var title;
var stAdd;
var rmAdd;
var wheelchair;
var notes;
var stSplit;

$('table tbody tr td').each(function(i, elem) { //from assignment 1
    
    if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px") {
        var fullTD = $(elem).text();
        var secondLine = fullTD.split('\n')[1]; //this line is the building name
        var thirdLine = fullTD.split('\n')[2]; //this is the title of the meeting
        var fourthLine = fullTD.split('\n')[3]; //this is the street address & room/floor
        var tenthLine = fullTD.split('\n')[9];//notes and accessibility
        var fourteenthLine = fullTD.split('\n')[13]; //potential accessibility
        building = secondLine.trim(); //Building
        title = thirdLine.trim(); //Title
        var splitAdd = fourthLine.split(',',2);
        stAdd = (splitAdd[0].trim() + ", New York, NY"); //Street Address
        stSplit = stAdd.split(' ').join('+');
        rmAdd = splitAdd[1]; //Room & Floor
        if (tenthLine.trim() == "Wheelchair access") {  //in this line some of the information was wheelchair accessibility and some of it was notes.  So I had to create if and else statements. 
            wheelchair = true;
        }
        
        else if (fourteenthLine == "                        Wheelchair access") {
            wheelchair = true;
        }
        
        else{
            notes = tenthLine.trim();
            wheelchair = false;
        }
    
        }
       
    //the time inforamtion was in a different <td> and style than the meeting information.  This if statement runs through that information.
    if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3;width:350px;") {
        var secondTD = $(elem).text().split('\n'); //took out .text()
        var count = secondTD.length;
        for (var j=2; j < (count-3); j=j+4) {       
            var meetingId = Math.round((Math.random()*1000000));//start creating meeting IDs
            var time = secondTD[j];
            var newTime = time.trim().split(" ");
            console.log(newTime);
            var count2 = newTime.length;
            var weekday = newTime[0];
            var pStartTime = newTime[3] + " " + newTime[4];
            if (newTime[4] == "PM") {
                var convertStartTime = newTime[3].split(':',2);
                var startHour = (parseInt(convertStartTime[0], 10)+12);  //to create a measurable time for searching purposes.  
                var startMin = (parseInt(convertStartTime[1], 10));
                if (startHour == 24) {
                    startHour = 12;
                }

            }
            else {
                var convertStartTime = newTime[3].split(':',2);
                var startHour = (parseInt(convertStartTime[0], 10));
                var startMin = (parseInt(convertStartTime[1], 10));
            }
            
            var pEndTime = newTime[6] + " " + newTime[7];   
            
            if (newTime[7] == "PM") {
                var convertEndTime = newTime[6].split(':',2);
                var endHour = (parseInt(convertEndTime[0], 10)+12);  //created a military like time
                var endMin = (parseInt(convertEndTime[1], 10));
                if (endHour == 24) {
                    endHour = 12;
                }

            }
            else {
                var convertEndTime = newTime[6].split(':',2);
                var endHour = (parseInt(convertEndTime[0], 10));
                var endMin = (parseInt(convertEndTime[1], 10));
            }
            var meetingType;  //instead of using codes, I wanted to spell out what each abbreviation meant.
            if ( newTime[10] == 'BB' | newTime[10] == 'C' | newTime[10] == 'S' | newTime[10] == 'OD' | newTime[10] == 'T' | newTime[10] == 'O' | newTime[10] == 'B' | newTime[10] == 'Sp') {
                if (newTime[10] == 'BB'){
                    meetingType = 'Big Book Meeting';
                }
                else if (newTime[10] == 'C'){
                    meetingType = 'Closed Discussion Meeting';
                }
                else if (newTime[10] == 'S'){
                    meetingType = 'Step Meeting';
                }
                else if (newTime[10] == 'OD'){
                    meetingType = 'Open Discussion Meeting';
                }
                else if (newTime[10] == 'T'){
                    meetingType = 'Traditional Meeting';
                }
                else if (newTime[10] == 'O'){
                    meetingType = 'Open Meeting';
                }
                else if (newTime[10] == 'B'){
                    meetingType = 'Beginners Meeting';
                }
                else if (newTime[10] == 'Sp'){
                    meetingType = 'Spanish Speaking Meeting';
                }
                else {
                    meetingType = ""
                }
            var special = "";
            }
            for (var k=10; k < count2; k++) {//I also spelled out speical interest instead of using codes.  Just so I can understand the dataset better.
                if (newTime[k] == "Special") {
                    if (newTime[k+2] == "Young"){
                        special = "Young People";
                        }
                    else if (newTime[k+2] == "Spiritual") {
                        special = "Spiritual Workshop";
                    }
                    else if (newTime[k+2] == "Gay,") {
                        special = "Lesbian, Gay, & Bisexual";
                    }
                    else if (newTime[k+2] == "H.I.V.") {
                        special = "H.I.V. Positive";
                    }
                    else if (newTime[k+2] == "Living") {
                        special = "Living Sober";
                    }
                    else if (newTime[k+2] == "First") {
                        special = "First Step Workshop";
                    }
                    else if (newTime[k+2] == "Steps") {
                        special = "Steps 1-2-3";
                    }
                    else if (newTime[k+2] == "Eleventh") {
                        special = "Eleventh Step";
                    }
                    else if (newTime[k+2] == "Special") {
                        special = "Special Purpose Meeting";
                    }
                    else if (newTime[k+2] == "Came") {
                        var special = "Came to Believe";
                    }
                    else if (newTime[k+2] == "As") {
                        var special = "As Bill Sees It";
                    }
                    else if (newTime[k+2] == "Children") {
                        var special = "Children Welcome";
                    }
                    else if (newTime[k+2] == "") {
                        var special = "";
                    }
                    else if (newTime[k+2] == "Meeting") {
                        var special = "*";
                    }
                    else {
                        var special = ""
                    }
                    
    
                    }
                  
                }
                //Start pushing to array of an object
                aaMeetingArray.push(new enterData(meetingId, stAdd, stSplit,title, building, rmAdd, wheelchair, notes, weekday, pStartTime, pEndTime, startHour, startMin, endHour, endMin, meetingType, special));
            }
            
        }
          
    
    
});
    
fs.writeFileSync('aaZone7.json', JSON.stringify(aaMeetingArray)); //changed to json.

console.log(aaMeetingArray);


function enterData(_meetingId, _stAdd, _stSplit,_title, _building, _rmAdd, _wheelchair, _notes, _weekday, _pStartTime, _pEndTime, _startHour, _startMin, _endHour, _endMin, _meetingType, _special) {
    var private = {}; //I probably could have used this instead of the private name, but its something similar I did for another project so I used it here.  
            private.id = _meetingId;
            //private.addresInfo = _aaLocation;
            private.streetAddress = _stAdd;
            private.streetSplit = _stSplit;
            private.meetingTitle = _title;
            private.buildingName = _building;
            private.roomFloor = _rmAdd;
            private.accessibility = _wheelchair;
            private.meetingNotes = _notes;
            private.meetingDay = _weekday;
            private.startTimeWeb = _pStartTime;
            private.endTimeWeb = _pEndTime;
            private.startHourQ = _startHour;
            private.startMinQ = _startMin;
            private.endHourQ = _endHour;
            private.endMin = _endMin;
            private.startHourQ = _startHour;
            private.meetType = _meetingType;
            private.specialInterest = _special;
            return private;
          //needs to happen outside the function
          } 
          

