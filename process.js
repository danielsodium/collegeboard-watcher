const https = require('follow-redirects').https;
const fs = require('fs');
const { shell } = require('electron')

function openvid() {
    shell.openExternal('https://res.cloudinary.com/drferrel/video/upload/v1620708706/ap-us-history-google-chrome-2021-05-10-21-39-48_wWYaN9yS_cqdbhg.mp4')
}

function sendReq() {
    
    auth = document.getElementById("auth").value
    payload = changeData(document.getElementById("payload").value)
    var options = {
        'method': 'POST',
        'hostname': 'apc-api-production.collegeboard.org',
        'path': '/fym/graphql',
        'headers': {
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
        'maxRedirects': 20
      };

      var req = https.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          document.getElementById("end").appendChild(document.createTextNode("Process Complete. Result:"))
          document.getElementById("end-two").appendChild(document.createTextNode(body.toString()))
          console.log(body.toString());
        });
      
        res.on("error", function (error) {
          console.error(error);
        });
      });
      req.write(JSON.stringify(payload));
      req.end();
}

function changeData(data) {
    data = JSON.parse(data);
    data.variables.playTimePercentage = "1.00";
    data.variables.progress = new Array(data.variables.progress.length).fill(1)
    data.variables.status = "COMPLETE";
    data.variables.watchedPercentage = "1.00";
    console.log(data)
    return data;
}