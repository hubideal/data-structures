var fs 	    = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var eJson = JSON.parse(fs.readFileSync('entTestList.json','utf8'));
var eList = eJson.stringify;
var websites =[];

for(var i = 0; i < eList.length; i++) {
	request({
		uri: "http://en.wikipedia.org/wiki/" + eList[i]
	}, function (err, response, body) {
		// Initialize cheerio
		var $ = cheerio.load(body);

		// Select geo location a each page + get the nodes text content
		var wikiBio = $("#content");
		var wikiString = wikiBio.html();


		// Assign the page elements to a variables
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
			wikiContent: wikiString,
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
		}
		
	});
}

// Saves file in JSON format
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