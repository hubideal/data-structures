var fs = require('fs');
var cheerio = require('cheerio');


var eContent = JSON.parse(fs.readFileSync('wiki-content-new-school-entrepreneurs.json', 'utf8'));
var content = eContent;
// console.log(content);
//create object to load content 



//create an array to push content
var newEntrepreneurArray= [];

for (var i=0; i<content.length; i++) {
    var entreTable = content[i].wikiContent;
    var $ = cheerio.load(entreTable);
    var test = $('div.mw-parser-output').html();
    
    // var entTable = entreTable.text();
    var title = content[i].wikiTitle;
    // console.log(entreTable);
    var wikiTable = {
			name: title,
			table: test,
		};
	
  newEntrepreneurArray.push(wikiTable);
}

console.log(newEntrepreneurArray);
//forEach(content)