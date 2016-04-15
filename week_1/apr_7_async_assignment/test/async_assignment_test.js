const assert = require('assert');
const expect = require('chai').expect;
const FileParser = require(__dirname + '/../ee_refactor');

describe('async order', () => {
  beforeEach(() => {
    this.files = [ __dirname + '/three.txt',
                   __dirname + '/two.txt',
                   __dirname + '/one.txt'];
    this.testStream = {
      data: '',
      write: function(input) {
        this.data += input;
      }
    };
  });

  it('should read files in order', (done) => {
    var fp = new FileParser(this.files, function(stream) {
      expect(stream.data).to.eql('one\ntwo\nthree\ndone');
      process.stdout.write(stream.data);
      done();
    }, this.testStream);
    fp.start();
  });
});
