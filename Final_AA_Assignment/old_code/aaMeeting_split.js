var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('output04.txt');

//create object to load content 
var $ = cheerio.load(content);

//create an array to push content
var aaMeetingArray= [];

//function
var building;
    var title;
    var stAdd;
    var rmAdd;
    var wheelchair;
    var notes;
    var stSplit;

$('table tbody tr td').each(function(i, elem) { 
    
    if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px") {
        var fullTD = $(elem).text();
        //var aaLocation = [];
         //split the string into an array
        var firstLine = fullTD.split('\n')[0];
        var secondLine = fullTD.split('\n')[1];
        var thirdLine = fullTD.split('\n')[2];
        var fourthLine = fullTD.split('\n')[3];
        //var fifthLine = fullTD.split('\n')[4];
        //var data1 = $(elem).contents().get(6).nodeValue;
        var ninthLine = fullTD.split('\n')[8];
        var tenthLine = fullTD.split('\n')[9];
        var eleventhLine = fullTD.split('\n')[10];
        var twelthLine = fullTD.split('\n')[11];
        var thirteenthLine = fullTD.split('\n')[12];
        var fourteenthLine = fullTD.split('\n')[13];
        var fifthteenthLine = fullTD.split('\n')[14];
        var sixteenthLine = fullTD.split('\n')[15];
        //console.log(firstLine.trim());
        building = secondLine.trim(); //Building
        title = thirdLine.trim(); //Title
        //console.log(fourthLine.trim()); //Address
        var splitAdd = fourthLine.split(',',2);
        stAdd = (splitAdd[0].trim() + ", New York, NY"); //Street Address
        stSplit = stAdd.split(' ').join('+');
        rmAdd = splitAdd[1]; //Room & Floor
        console.log("street address: " + stAdd);
        console.log("room: " + rmAdd);
        //console.log(ninthLine);
        console.log(tenthLine.trim()); //Notes or Wheelchair Access
        //wheelchair;
        //notes;
        if (tenthLine.trim() == "Wheelchair access") {
            wheelchair = true;
        }
        else {
            notes = tenthLine.trim();
            wheelchair = false;
        }
        console.log("notes: " + notes);
        //console.log(eleventhLine);
        //console.log(twelthLine);
        //console.log(thirteenthLine);
        console.log(fourteenthLine); //Wheelchair Access
        if (fourteenthLine == "                        Wheelchair access") {
            wheelchair = true;
    }
        
        
        console.log("Wheelchair Access: " + wheelchair);
        //console.log(fifthteenthLine);
        //console.log(sixteenthLine);
        //aaLocation.push(new enterLocation(stAdd, title, building, rmAdd, wheelchair, notes));
        }
        //console.log(aaLocation);
        //aaLocation.push(new enterLocation(stAdd, title, building, rmAdd, wheelchair, notes));
        //aaMeetingArray.push(new enterData(weekday, pStartTime, pEndTime, startHour, startMin, endHour, endMin, meetingType, special));
           

    
    
    if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3;width:350px;") {
        var secondTD = $(elem).text().split('\n'); //took out .text()
        var count = secondTD.length;
        for (var j=2; j < (count-3); j=j+4) {       //start creating meeting IDs
            var meetingId = Math.round((Math.random()*1000000));
            console.log(meetingId);
            var time = secondTD[j];
            var newTime = time.trim().split(" ");
            var count2 = newTime.length;
            var weekday = newTime[0]
            console.log(weekday);
            var pStartTime = newTime[3] + " " + newTime[4];
            console.log(newTime[3]);
            console.log(newTime[4]);
            if (newTime[4] == "PM") {
                var convertStartTime = newTime[3].split(':',2);
                console.log(convertStartTime);
                var startHour = (parseInt(convertStartTime[0], 10)+12);
                var startMin = (parseInt(convertStartTime[1], 10));
                if (startHour == 24) {
                    startHour = 12;
                }
                console.log(startHour);
                console.log(startMin);
            }
            else {
                var convertStartTime = newTime[3].split(':',2);
                console.log(convertStartTime);
                var startHour = (parseInt(convertStartTime[0], 10));
                var startMin = (parseInt(convertStartTime[1], 10));
                console.log(startHour);
                console.log(startMin);
            }
            
            var pEndTime = newTime[6] + " " + newTime[7];   
            console.log(newTime[6]);
            console.log(newTime[7]);
            
            if (newTime[7] == "PM") {
                var convertEndTime = newTime[6].split(':',2);
                console.log(convertEndTime);
                var endHour = (parseInt(convertEndTime[0], 10)+12);
                var endMin = (parseInt(convertEndTime[1], 10));
                if (endHour == 24) {
                    endHour = 12;
                }
                console.log(endHour);
                console.log(endMin);
            }
            else {
                var convertEndTime = newTime[6].split(':',2);
                console.log(convertEndTime);
                var endHour = (parseInt(convertEndTime[0], 10));
                var endMin = (parseInt(convertEndTime[1], 10));
                console.log(endHour);
                console.log(endMin);
            }
            var meetingType;
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
            console.log("Meeting Type: " + meetingType);
            }
            for (var k=10; k < count2; k++) {
                if (newTime[k] == "Special") {
                    console.log(newTime[k+2]);
                    if (newTime[k+2] == "Young"){
                        var special = "Young People";
                        }
                    else if (newTime[k+2] == "Spiritual") {
                        var special = "Spiritual Workshop";
                    }
                    else if (newTime[k+2] == "Gay,") {
                        var special = "Lesbian, Gay, & Bisexual";
                    }
                    else if (newTime[k+2] == "H.I.V.") {
                        var special = "H.I.V. Positive";
                    }
                    else if (newTime[k+2] == "Living") {
                        var special = "Living Sober";
                    }
                    else if (newTime[k+2] == "First") {
                        var special = "First Step Workshop";
                    }
                    else if (newTime[k+2] == "Steps") {
                        var special = "Steps 1-2-3";
                    }
                    else if (newTime[k+2] == "Eleventh") {
                        var special = "Eleventh Step";
                    }
                    else if (newTime[k+2] == "Special") {
                        var special = "Special Purpose Meeting";
                    }
                    else if (newTime[k+2] == "Came") {
                        var special = "Came to Believe";
                    }
                    else if (newTime[k+2] == "As") {
                        var special = "As Bill Sees It";
                    }
                    else {
                         special = newTime[k+2];
                    }
                console.log("special interest: " + special);
                //aaMeetingArray.push(new enterData(meetingId, var wheelchair;
        
        
                    }
                    //aaMeetingArray.push(new enterData(meetingId, stAdd, title, building, rmAdd, wheelchair, notes, weekday, pStartTime, pEndTime, startHour, startMin, endHour, endMin, meetingType, special));
        
                }
                //Start pushing to array of an object
                aaMeetingArray.push(new enterData(meetingId, stAdd, stSplit,title, building, rmAdd, wheelchair, notes, weekday, pStartTime, pEndTime, startHour, startMin, endHour, endMin, meetingType, special));
            }
            //aaMeetingArray.push(new enterData(meetingId, stAdd, title, building, rmAdd, wheelchair, notes, weekday, pStartTime, pEndTime, startHour, startMin, endHour, endMin, meetingType, special));
        
        }
        //aaMeetingArray.push(new enterData(meetingId, stAdd, title, building, rmAdd, wheelchair, notes, weekday, pStartTime, pEndTime, startHour, startMin, endHour, endMin, meetingType, special));
            
    
    
});
    
fs.writeFileSync('aaSplitSchedule.json', JSON.stringify(aaMeetingArray)); //changed to json.

console.log(aaMeetingArray);
//aaMeetingArray.push(new enterData(meetingId, stAdd, title, building, rmAdd, wheelchair, notes, weekday, pStartTime, pEndTime, startHour, startMin, endHour, endMin, meetingType, special));
              
//_meetingId, _stAdd, _title, _building, _rmAdd, _wheelchair, _notes, 

function enterData(_meetingId, _stAdd, _stSplit,_title, _building, _rmAdd, _wheelchair, _notes, _weekday, _pStartTime, _pEndTime, _startHour, _startMin, _endHour, _endMin, _meetingType, _special) {
    var private = {};
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
          
//stAdd, title, building, rmAdd, wheelchair, notes

//function enterLocation(_stAdd, _title, _building, _rmAdd, _wheelchair, _notes) {
//    var separate = {};
//            //private.id = _meetingId;
//            separate.streetAddress = _stAdd;
//            separate.meetingTitle = _title;
//            separate.buildingName = _building;
//            separate.roomFloor = _rmAdd;
//            separate.accessibility = _wheelchair;
//            separate.meetingNotes = _notes;
//            //private.meetingDay = _weekday;
//            //private.startTimeWeb = _pStartTime;
//            //private.endTimeWeb = _pEndTime;
//            //private.startHourQ = _startHour;
//            //private.startMinQ = _startMin;
//            //private.endHourQ = _endHour;
//            //private.endMin = _endMin;
//            //private.startHourQ = _startHour;
//            //private.meetType = _meetingType;
//            //private.specialInterest = _special;
//            return separate;
//          //needs to happen outside the function
//          }
          

     
        //$('br').each(function(i, elem){
          //.replace(/(\r\n|\n|\r|\t)/gm,"")  
        
        
        
            
            
            // $('<br>').each(function(j, e)    
        
        
        
        //var secondTD = $(elem).text();
        //var secondTDT = secondTD.trim();
        //console.log(elem);
        //var firstTime = $(elem).contents().get(0).nodeValue;
        //var secondTime = $(elem).contents().get(1).nodeValue;
        //var thirdTime = $(elem).contents().get(2).nodeValue;
        //var fourthTime = $(elem).contents().get(3).nodeValue;
        //var fifthTime = $(elem).contents().get(4).nodeValue;
        //var sixthTime = $(elem).contents().get(5).nodeValue;
        //var firstTime = secondTD.trim().split('\n')[1];
        //var secondTime = secondTD.trim().split('\n')[2];
        //var thirdTime = secondTD.trim().split('\n')[3];
        //var fourthTime = secondTD.split('\n')[4];
        //var fifthTime = secondTD.split('\n')[5];
        //var sixthTime = secondTD.split('\n')[6];
        //var seventhTime = secondTD.split('\n')[7];
        //var eigthTime = secondTD.split('\n')[5];
        //var fifthTime = secondTD.split('\n')[5];
        //var fifthTime = secondTD.split('\n')[5];
        //var fifthTime = secondTD.split('\n')[5];
        //
        //console.log(firstTime);
        //console.log(secondTime);
        //console.log(thirdTime);
        //console.log(fourthTime);
        //console.log(fifthTime);


//if ($(elem).attr('class') == "detailsBox") {
//        var details = $(elem).text();
//        console.log(details);


//print data as a string
//console.log(data2.toString());

//loop through array to print string



//console.log(data2);

//var elemId = $(elem).getElementById("b");
        //var childCount = elemID.childElementCount;
        //console.log(childCount);

//const fruits = [];
// 
//$('li').each(function(i, elem) {
//  fruits[i] = $(this).text();
//});