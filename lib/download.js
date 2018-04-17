const fs        = require('fs');
const path      = require('path');
const mkdirp    = require('mkdirp');
const request   = require('request');

module.exports = (fileLocation,saveLocation,fileName,next)=>{
  return new Promise((resolve,reject)=>{
    mkdirp(saveLocation, (err)=>{
      request(fileLocation, {encoding: 'binary'}, function(error, response, body) {
        let destination = path.join(__dirname,'../',saveLocation,fileName);
        fs.writeFile(destination, body, 'binary', function (err) {
          console.log("File download completed");
          resolve(destination);
        });
      });
    });
  })
}
