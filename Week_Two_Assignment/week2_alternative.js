var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('data/output04.txt');

var $ = cheerio.load(content);
var data2= [];

$('table tbody tr td').each(function(i, elem) {
    if ($(elem).attr('bgcolor') == "FFFFFF"){
         
            $(elem).find('td').each(function(i, e) {
                if ($(e).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px"){
                    var data1 = $(e).contents().get(6).nodeValue;
                    data2.push(data1.trim().split(',',1));
                }
            })

    };
});

console.log(data2.toString());

for (var j=0; j<data2.length; j++) {
    console.log(data2[j]);
}

