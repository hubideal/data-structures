var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('output04.txt');

//create object to load content 
var $ = cheerio.load(content);

//create an array to push content
var data2= [];

//function
$('tr').each(function(i, elem) {
    if ($(elem).attr('style') == "margin-bottom:10px") {
        var data1 = $(elem).contents();
        data2.push(data1);
        
    }
  
});

console.log(data2);

//loop through array to print string

fs.writeFileSync('meetArray.json', JSON.stringify(data2));


