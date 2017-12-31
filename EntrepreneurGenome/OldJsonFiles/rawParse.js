var fs 	    = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var eList;

var websites =[];

request('https://raw.githubusercontent.com/hubideal/data-structures/master/EntrepreneurGenome/wiki-content-new-school-entrepreneurs.json', function(error, response, body) {
    eList= JSON.parse(body);
    console.log(eList);
});

for(var i = 0; i < eList.length; i++) {
		// Initialize cheerio
		var $ = cheerio.load(eList[i].wikiContent);

		// Select content from the JSON file - wikiContent
		var title = $("h1").html();
		
		var birthDay = $(".bday").html();
		
		var test = $('div.mw-parser-output').html();
		
		var test2 = $('div.mw-parser-output p').html();
		
		var test3 = $('div.mw-parser-output table.infobox').html();


	console.log(title);
	console.log(test2);
	console.log(test3);
		


		// Assign values to an object
		var contentData = {
			wikiTitle: title,
			birthDate: birthDay,
			wikiTest: test,
			wikiTest2: test2,
			wikiTable: test3,
		};
		
		// pushes the objects into two arrays
		websites.push(contentData);

		// Saves data as a json file when all battles are scraped
		if(websites.length === eList.length) {
			saveFile(websites, "wiki-content-test-entrepreneurs");
		};
}

// Saves file in JSON format
function saveFile(data, fileName) {

	fs.writeFile(JSON.stringify(data), function (err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	}); 
}