var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('data/output04.txt');

//create object to load content 
var $ = cheerio.load(content);

//create an array to push content
var data2= [];

//function
$('td').each(function(i, elem) {
    if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px") {
        var data1 = $(elem).contents().get(6).nodeValue;
        data2.push(data1.trim().split(',',1))
    }
});

//print data as a string
console.log(data2.toString());

//loop through array to print string
for (var j=0; j<data2.length; j++) {
    console.log(data2[j]);
}

fs.writeFileSync('addArray.txt', data2, 'utf8');


