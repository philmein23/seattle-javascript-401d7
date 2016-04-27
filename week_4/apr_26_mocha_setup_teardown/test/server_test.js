const chai = require('chai');
const http = require('chai-http');
chai.use(http);

const expect = chai.expect;
const mongoose = require('mongoose');
const app = require(__dirname + '/../_server');

describe('our super awesome server', () => {
  before((done) => {
    this.server = app(3000, 'mongodb://localhost/test_server', done);
  });

  after(() => {
    this.server.close();
    mongoose.disconnect();
  });

  it('should send back some text', (done) => {
    chai.request('localhost:3000')
      .get('/anyroute/itdoesnnotmatter/awesome/cowabunga')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('this is the only route');
        done();
      });
  });
});
