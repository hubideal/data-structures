var fs 	    = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var eList = JSON.parse(fs.readFileSync('wikiParsonFoundListFINAL.json','utf8'));//files i parsed:  wikiTNSEntListFINAL.json entParList.json  wikiTNSFoundListFINAL1.json    wikiTNSFoundListFINAL2.json     wikiParsonFoundListFINAL.json 
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
		
		var test2 = $('div.mw-parser-output p').html();
		
		var test = $('div.mw-parser-output').html();
		
		var test3 = $('div.mw-parser-output table.infobox').html();


	console.log(title);
	console.log(test2);
	console.log(test3);
		


		// Assign values to an object
		var contentData = {
			wikiTitle: title,
			wikiTest2: test2,
			birthDate: birthDay,
			wikiTest: test,
			wikiTable: test3,
		};




		// pushes the objects into two arrays
		websites.push(contentData);

		// Saves data as a json file when all battles are scraped
		if(websites.length === eList.length) {
			saveFile(websites, "wikiParsonsFound");
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