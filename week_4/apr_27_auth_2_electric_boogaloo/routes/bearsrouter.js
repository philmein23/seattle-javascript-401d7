const Router = require('express').Router;
const Bear = require(__dirname + '/../models/bear');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var bearsRouter = module.exports = Router();

bearsRouter.post('/bears', jwtAuth, bodyParser, (req, res) => {
  var newBear = new Bear(req.body);
  newBear.wranglerId = req.user._id;
  newBear.save((err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

bearsRouter.get('/bears', jwtAuth, (req, res) => {
  Bear.find({wranglerId: req.user._id}, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

bearsRouter.put('/bears/:id', bodyParser, (req, res) => {
  var bearData = req.body;
  delete bearData._id;
  Bear.update({_id: req.params.id}, bearData, (err) => {

    if (err) return serverErrorHandler(err, res);

    res.status(200).json({msg: 'wow such update'});
  });
});

bearsRouter.delete('/bears/:id', (req, res) => {
  Bear.remove({_id: req.params.id}, (err) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json({msg: 'ding dong the bear is dead'});
  });
});
