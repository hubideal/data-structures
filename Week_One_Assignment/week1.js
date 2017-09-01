var request = require('request');
var fs = require('fs');
//var output_file=["/home/ubuntu/workspace/data/output1.txt", "/home/ubuntu/workspace/data/output2.txt", "/home/ubuntu/workspace/data/output3.txt", "/home/ubuntu/workspace/data/output4.txt", "/home/ubuntu/workspace/data/output5.txt", "/home/ubuntu/workspace/data/output6.txt", "/home/ubuntu/workspace/data/output7.txt", "/home/ubuntu/workspace/data/output8.txt", "/home/ubuntu/workspace/data/output9.txt", "/home/ubuntu/workspace/data/output10.txt"];
//var agenda = ["http://visualizedata.github.io/datastructures/data/m01.html", "http://visualizedata.github.io/datastructures/data/m02.html", "http://visualizedata.github.io/datastructures/data/m03.html", "http://visualizedata.github.io/datastructures/data/m04.html", "http://visualizedata.github.io/datastructures/data/m05.html", "http://visualizedata.github.io/datastructures/data/m06.html", "http://visualizedata.github.io/datastructures/data/m07.html", "http://visualizedata.github.io/datastructures/data/m08.html", "http://visualizedata.github.io/datastructures/data/m09.html", "http://visualizedata.github.io/datastructures/data/m10.html"];

var i=1;
var j;

function gatherData () {
  
  if (i < 10) {
    j="0"+i;}
    
  else {
    j=""+i;
  };
  
  var agenda = "http://visualizedata.github.io/datastructures/data/m"+j+".html";
  request(agenda,function (error, response, body) {
        
        if (!error && response.statusCode == 200){
         fs.writeFileSync("./data/output"+j+".txt", body);
         console.log("/home/ubuntu/workspace/data/output"+j+".txt");
         i++;
         if (i<=10){
           gatherData();
         }
         else if (i>10){
           return;
         }
        }
         
         else {console.error('request failed')}
         
         });
         
      }
      
gatherData ();  