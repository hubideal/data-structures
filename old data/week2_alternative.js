var fs = require('fs');
var cheerio = require('cheerio');

//load output4 file
var content = fs.readFileSync('data/output04.txt');

//create object to load content 
var $ = cheerio.load(content);

//create an array to push content

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

fs.writeFileSync('addArray.txt', data2, 'utf8s');
//for (var j=0; j<data2.length; j++) {
    
  //  ;
//}

