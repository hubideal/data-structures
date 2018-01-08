//using my code from week3
var trackCount = 0;
var fs = require('fs');
var request = require('request'); // use to make HTML calls

var fs = require('fs');
var cheerio = require('cheerio');
var linkedInfo=[];


var content = JSON.parse(fs.readFileSync('linkedInTNSList.json','utf8')); //

//create object to load content 


content.forEach( function(d, i) {
    var splitName = d.name.replace(/ +(?= )/g,'').split("\n", 1);
    var splitTitle = d.title.split("<span>", 2);
    var splitWebsite = d.website.split("id=", 1);
    console.log(splitName);
    var contentData = {
			liName: splitName,   //name
			liTitle: splitTitle, //short title
			liWebsite: splitWebsite,  //website link
		};
	linkedInfo.push(contentData);
});

saveFile(linkedInfo, "linkedInTNSCleaned.json");

// Saves file in JSON format  HELPFUL code for future projects.
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