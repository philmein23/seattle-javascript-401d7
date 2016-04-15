const fs = require('fs');

module.exports = exports = function(fileName, cb) {
  cb = cb || () => {};

  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        cb(err);
        return reject(err);
      }

      cb(null, data);
      resolve(data);
    });
  });
};
