const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mongodb://localhost/bears_test_db';
require(__dirname + '/../server');

describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should Build-A-Bear', (done) => {
    request('localhost:' + port)
    .post('/api/bears')
    .send({name: 'Ranger Rick', variety: 'Racoon', fishPreference: 'mustache-filtered microbrews'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Ranger Rick');
      expect(res.body.variety).to.eql('Racoon');
      expect(res.body.fishPreference).to.eql('mustache-filtered microbrews');
      done();
    })
  });
});

describe('the GET method', () => {
  it('should get all the bears', (done) => {
    request('localhost:' + port)
    .get('/api/bears')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      debugger;
      expect(res.body.length).to.eql(0);
      done();
    });
  });

})
