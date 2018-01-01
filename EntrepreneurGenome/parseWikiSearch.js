// This js file contains the code that parsed through my online wiki search which was saved as a txt file.  It gve me the names 

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('wikiParsonFound.txt');  //searched Parsons Design Entrepreneur  357 results

// load `content` into a cheerio object
var $ = cheerio.load(content);

var eList = [];

// print names of thesis students
$('li a').each(function(i, elem) {
    var title=$(elem).text();
    console.log($(elem).text());
    eList.push(title);
});

fs.writeFileSync('wikiParsonFoundList.json', JSON.stringify(eList));
