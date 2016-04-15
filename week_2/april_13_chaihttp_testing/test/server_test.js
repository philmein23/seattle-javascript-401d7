const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
require(__dirname + '/../server');

describe('Craig\'s super awesome HTTP server', () => {
  it('should accept GET requests to /someroute', (done) => {
    request('localhost:3000')
    .get('/someroute')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('<h1>wow such GET</h1>');
      done();
    });
  });

  it('should four oh four on bad requests', (done) => {
    request('localhost:3000')
    .get('/badroute')
    .end((err, res) => {
      expect(res.status).to.eql(404);
      expect(res.text).to.eql('this be a 404 message, yo');
      done();
    });
  });

  it('should accept POST requests to /someroute', (done) => {
    request('localhost:3000')
    .post('/someroute')
    .send({'never': 'gonna give you up'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('gonna give you up');
      done();
    });
  });
});
