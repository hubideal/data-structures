var fs = require('fs');

var fullArray = JSON.parse(fs.readFileSync('aaSchedule.json', 'utf8'));
var addArray = JSON.parse(fs.readFileSync('meetingsData.json', 'utf8'));
var completeArray = [];
var count = fullArray.length;


for (var i=0; i < count; i++){
    var street = fullArray[i].streetAddress;
    var original = addArray[i].address;
    if (street == original) {
        var meetingId = fullArray[i].id;
        var stAdd = fullArray[i].streetAddress;
        var title = fullArray[i].meetingTitle;
        var building = fullArray[i].buildingName;
        var rmAdd = fullArray[i].roomFloor;
        var coorLL = addArray[i].latLong;
        var googAdd = addArray[i].googleAdd;
        var wheelchair = fullArray[i].accessibility;
        var notes = fullArray[i].meetingNotes;
        var weekday = fullArray[i].meetingDay;
        var pStartTime = fullArray[i].startTimeWeb;
        var pEndTime = fullArray[i].endTimeWeb;
        var startHour = fullArray[i].startHourQ;
        var startMin = fullArray[i].startMinQ;
        var endHour = fullArray[i].endHourQ;
        var endMin = fullArray[i].endMin;
        var meetingType = fullArray[i].meetType;
        var special = fullArray[i].specialInterest;
        completeArray.push(new enterData(meetingId, stAdd, title, building, rmAdd, coorLL, googAdd, wheelchair, notes, weekday, pStartTime, pEndTime, startHour, startMin, endHour, endMin, meetingType, special));
            }
    else { return i = i-1;
    }

}

fs.writeFileSync('aaFullSchedule.json', JSON.stringify(completeArray));  



function enterData(_meetingId, _stAdd, _title, _building, _rmAdd, _coorLL, _googAdd, _wheelchair, _notes, _weekday, _pStartTime, _pEndTime, _startHour, _startMin, _endHour, _endMin, _meetingType, _special) {
    var private = {};
            private.id = _meetingId;
            //private.addresInfo = _aaLocation;
            private.nycAddress = _stAdd;
            private.meetingTitle = _title;
            private.buildingName = _building;
            private.roomFloor = _rmAdd;
            private.latLongCoor = _coorLL;
            private.formatedAdd = _googAdd;
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
