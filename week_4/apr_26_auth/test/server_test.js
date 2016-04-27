const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mongodb://localhost/bears_test_db';
require(__dirname + '/../server');
const Bear = require(__dirname + '/../models/bear');

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
});


describe('routes that need a bear in the DB: ', () => {

  beforeEach((done) => {
    var newBear = new Bear({name: 'testbear', variety: 'testing', fishPreference: 'the one true cod'});
    newBear.save((err, data) => {
      this.bear = data;
      done();
    });
  });

  afterEach((done) => {
    this.bear.remove((err) => {
      done();
    })
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should change the Bear\'s identity on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/bears/' + this.bear._id)
    .send({name: 'John Cena', variety: 'rasslin\' bear', fishPreference: 'Chilean sea bass with a side of chairs' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('wow such update');
      done();
    });
  });


  it('should turn the bear into a nice rug when Gene murders it with a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/bears/' + this.bear._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('ding dong the bear is dead');
      done();
    });
  });

});
