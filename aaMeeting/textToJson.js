var fs = require('fs');


var content = fs.readFileSync('output04.txt', 'utf8');

console.log(content);

fs.writeFileSync('meetAAArray.json', JSON.stringify(content));

