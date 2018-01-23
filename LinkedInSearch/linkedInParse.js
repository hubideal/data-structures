//this file contains the code that was really the workhorse of the wiki search.  taking the names identified in the wiki search, I went to each site of the list of names and scraped all of the contents of their websites into a json file.  

var fs 	    = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var content = fs.readFileSync('parsonEnt.txt');
var websites =[];

var $ = cheerio.load(content)


$('li').each(function(i, elem) {
	if ($(elem).attr('class') == 'org-alumni-profiles-module__profiles-list-item full-width') {
		var fullTD = $(elem).html();
        var LinkedInN = fullTD.split('-visited-state ember-view">')[1];
        var LinkedInT = fullTD.split('multiline--truncation-target">')[1];
        var LinkedInW = fullTD.split('<a href=')[1];
        // var LinkedInName = LinkedInN.split('</a>')[0];
        // var LinkedInTitle = LinkedInT.split('<button class="truncate-multiline')[0];
        // var LinkedInWebsite = LinkedInW.split('id=')[0];
	}
	else {
		console.log("no name");
		return
	}
	
	// var LinkedInName = $('dt a').html().replace(/ +(?= )/g,'');
	// var LinkedInTitle = $('.truncate-multiline--truncation-target').html();
	// var LinkedInWebsite = $("dt").html().replace(/\s/g, '');

console.log("name");
console.log(LinkedInN);
console.log("title");
console.log(LinkedInT);
console.log("website");
console.log(LinkedInW);
		


		// Assign values to an object
		var contentData = {
			name: LinkedInN,   //name
			title: LinkedInT, //short title
			website: LinkedInW,  //website link
		};
		
		// pushes the objects into two arrays
		websites.push(contentData);

		// Saves data as a json file when all battles are scraped
		
	});

saveFile(websites, "linkedInParsonsList");

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