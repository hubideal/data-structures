//this file contains the code that was really the workhorse of the wiki search.  taking the names identified in the wiki search, I went to each site of the list of names and scraped all of the contents of their websites into a json file.  

var fs 	    = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var content = fs.readFileSync('linkedinTNSEnt.txt');
var websites =[];


$('dl class="org-alumni-profile-card__profile-info pl3 pr3 flex-grow-1').each(function(i, elem) {
	if ($(elem).attr('class') == "org-alumni-profile-card__full-name-link link-without-visited-state ember-view") {
        var LinkedInName = $(elem).text();
	}
	else {
		console.log("no name");
	}
	
	if ($(elem).attr('class') == "truncate-multiline--truncation-target") {
        var LinkedInTitle = $(elem).text();
	}
	
	var LinkedInWebsite = $("dt").html();
	
	


	console.log(LinkedInName);
		


		// Assign values to an object
		var contentData = {
			name: LinkedInName,   //name
			title: LinkedInTitle, //short title
			website: LinkedInWebsite,  //website link
		};
		
		// pushes the objects into two arrays
		websites.push(contentData);

		// Saves data as a json file when all battles are scraped
		
	});

saveFile(websites, "linkedInTNSList");

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