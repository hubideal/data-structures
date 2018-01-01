//I used this code to create a small json file that includes people's names, short bios, and birthdates for easier reference. It will be easier to also clean data.  

var fs = require('fs');
var request = require('request');
var eList = JSON.parse(fs.readFileSync('combinedTNSParson.JSON','utf8'));

var wikiBioArray =[];

for(var i = 0; i < eList.length; i++) { 
    var wikiName = eList[i].wikiTitle;
    var wikiBio = eList[i].wikiTest2;
    var wikiBDay = eList[i].birthDate;
    
    var contentData = {
			name: wikiName,
			bio: wikiBio,
			birthDate: wikiBDay,
		};
	
	wikiBioArray.push(contentData);

		// Saves data as a json file when all battles are scraped
		if(wikiBioArray.length === eList.length) {
			saveFile(wikiBioArray, "combinedSmallTNSParsons");
		}
    }
    
function saveFile(data, fileName) {
	outputRoute = __dirname + "/" + fileName + ".json";

	fs.writeFile(outputRoute, JSON.stringify(data, null, 4), function (err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	}); 
}
    
    
