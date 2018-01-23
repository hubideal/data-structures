var fs 	    = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var eList = "/in/davidjasse";//files i parsed:  wikiTNSEntListFINAL.json entParList.json  wikiTNSFoundListFINAL1.json    wikiTNSFoundListFINAL2.json     wikiParsonFoundListFINAL.json 
var websites =[];

for(var i = 0; i < 1; i++) {
	request({
		url: "https://www.linkedin.com" + eList
	}, function (err, response, body) {
		// Initialize cheerio
		var $ = cheerio.load(body);

		// Select geo location a each page + get the nodes text content
		var liCard = $('#ember1471').html();
		var liDetail = $('.profile-detail').html();


	console.log(liCard);



		// Assign values to an object
		var contentData = {
		    linkedInName: eList,
			linkedInCard: liCard,   //card
			linkedInDetail: liDetail, //detail
		};




		// pushes the objects into two arrays
		websites.push(contentData);

		// Saves data as a json file when all battles are scraped
		if(websites.length === 1) {
			saveFile(websites, "linkedInTNSFound");
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