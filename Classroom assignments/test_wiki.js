var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('www.wikidata.org/w/api.php');

//create object to load content 
var $ = cheerio.load(content);

//create an array to push content
var data = [];

//function
$('td').each(function(i, elem) {
    if ($(elem).attr('title') == "The New School") {
        var data1 = $(elem).contents();
        data.push(data1.trim())
    }
});

//print data as a string
console.log(data.toString());

//loop through array to print string
for (var j=0; j<data.length; j++) {
    console.log(data[j]);
}

fs.writeFileSync('newschoolArray.txt', data, 'utf8');
