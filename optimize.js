const download = require('./lib/download');
const optimize = require('./lib/optimize');
const fs       = require('fs');

module.exports.image = (event, context, callback) => {


  const params = event.queryStringParameters;

  download(params.fileUrl,'_tmp',params.fileName).then((location)=>{
    fs.readFile(location , (err,buffer)=>{
      optimize(buffer).then((optimized)=>{
        fs.writeFile(location.replace('_tmp','dist'),optimized,(err)=>{

          const response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'File optimized.',
              input: event,
            }),
          };

          callback(null, response);

        })
      })
    })
  })



};
