const Router = require('express').Router;
const Bear = require(__dirname + '/../models/bear');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname +'/../lib/error_handler');
var bearsRouter = module.exports = Router();

bearsRouter.post('/bears', bodyParser, (req, res) => {
  var newBear = new Bear(req.body);
  newBear.save((err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

bearsRouter.get('/bears', (req, res) => {
  Bear.find(null, (err, data) => {
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
