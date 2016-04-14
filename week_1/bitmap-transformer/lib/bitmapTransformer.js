'use strict';
const fs = require('fs');

const imgTransformer = module.exports = function(file) {
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    console.log('done');
    let buff = data;

    let bitMap = {};
    bitMap.readHeader = buff.toString('ascii', 0,2);
    bitMap.size = buff.readUInt32LE(2);
    bitMap.pixelArray  = buff.readUInt32LE(10);
    bitMap.paletteColors = buff.readUInt32LE(46);

    console.log(bitMap);

    const transform = function(conversion) {
      if (conversion === 'invert') {
        for (var i = 54; i < bitMap.pixelArray; i+=4) {
          let blueVal = buff.readUInt8(i);
          let greenVal = buff.readUInt8(i + 1);
          let redVal = buff.readUInt8(i + 2);
          let alphaVal = buff.readUInt8(i + 3);

          buff.writeUInt8(255 - blueVal, i);
          buff.writeUInt8(255 - greenVal, i + 1);
          buff.writeUInt8(255 - redVal, i + 2);
          buff.writeUInt8(255 - alphaVal, i + 3);
        }
        return buff;
      } else if (conversion === 'grayscale') {
        for (var i = 54; i < bitMap.pixelArray; i+=4) {
          let blueVal = buff.readUInt8(i);
          let greenVal = buff.readUInt8(i + 1);
          let redVal = buff.readUInt8(i + 2);

          let averageVal = (blueVal + greenVal + redVal)/3;

          buff.writeUInt8(averageVal, i);
          buff.writeUInt8(averageVal, i + 1);
          buff.writeUInt8(averageVal, i + 2);
        }
      }
    };

    transform('grayscale');

    fs.writeFile(__dirname + '/../img/new_bitmap.bmp', buff, () => {
      if (err) throw error;
      console.log('Write to File Completed');
    });
  });
};
