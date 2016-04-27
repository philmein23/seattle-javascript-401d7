const assert = require('assert');
const server = require(__dirname + '/../server');
const request = require('superagent');

describe('our server', () => {
  after((done) => {
    server.close(() => {
      done();
    });
  });

  it('should be a server', (done) => {
    request
      .get('localhost:3000/')
      .end((err, res) => {
        assert((res.status === 200), 'server did not send 200');
        assert((res.body.msg === 'hello world!'), 'server did not greet us');
        done();
      });
  });
});
