var fs = require('fs');


var content = fs.readFileSync('meetArray.txt', 'utf8');

console.log(content);

fs.writeFileSync('meetArray.json', JSON.stringify(content.trim()));

