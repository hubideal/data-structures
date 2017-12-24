var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('wikiResultsParsons.txt');  //searched Parsons Design Entrepreneur  357 results

// load `content` into a cheerio object
var $ = cheerio.load(content);

var eList = [];

// print names of thesis students
$('li a').each(function(i, elem) {
    var title=$(elem).text();
    console.log($(elem).text());
    eList.push(title);
});

fs.writeFileSync('entParList.json', JSON.stringify(eList));
