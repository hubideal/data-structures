//this file contains the code that was really the workhorse of the wiki search.  taking the names identified in the wiki search, I went to each site of the list of names and scraped all of the contents of their websites into a json file.  

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
		var title = $("h1").html();  //this is scraping the persons name for the json file
	
		var birthDay = $(".bday").html();  //some sites had birthdays.  so I included those as well.
		
		var test2 = $('div.mw-parser-output p').html();  //test2 is a bad name, but I didn't change it after testing.  This variable includes the short bio.
		
		var test = $('div.mw-parser-output').html(); //test is all of the content from the website (that pertains to the individual)
		
		var test3 = $('div.mw-parser-output table.infobox').html(); //test3 includes the table of information. 


	console.log(title);
	console.log(test2);
	console.log(test3);
		


		// Assign values to an object
		var contentData = {
			wikiTitle: title,   //name
			wikiTest2: test2, //short bio
			birthDate: birthDay,  //birthday
			wikiTest: test,  //all of the content
			wikiTable: test3, //the table with valuable information
		};




		// pushes the objects into two arrays
		websites.push(contentData);

		// Saves data as a json file when all battles are scraped
		if(websites.length === eList.length) {
			saveFile(websites, "wikiParsonsFound");
		}
		
	});
}

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