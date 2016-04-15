const EE = require('events');
const fs = require('fs');


const FileParser = module.exports = exports = function(files, cb, writeStream) {
  this.ee = new EE();
  this.files = files;
  this.cb = cb;
  this.writeStream = writeStream || process.stdout;

  this.ee.on('done', (fileArray) => {
    var nextFile = fileArray.pop();
    if (!nextFile) {
      this.writeStream.write('done');
      return this.cb(this.writeStream);
    }

    fs.readFile(nextFile, (err, data) => {
      if (err) return process.stderr.write(err);

      this.writeStream.write(data.toString());
      this.ee.emit('done', fileArray);
    });
  });
};

FileParser.prototype.start = function() {
  this.ee.emit('done', this.files);
};


// var files = ['three.txt', 'two.txt', 'one.txt'];
// var fp = new FileParser(files, () => {});
// fp.start();
