const imagemin    = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

function Optimize(buffer,opts = {}){
  return new Promise((resolve,reject)=>{
    imagemin.buffer(buffer, {
      use: [
        imageminJpegRecompress({ accurate : true}),
        imageminPngquant( {quality: opts.pngQuality || '70'} )
      ]
    }).then(resolve).catch(reject);
  })
}

module.exports = Optimize;
