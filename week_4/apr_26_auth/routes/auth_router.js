const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');

var router = module.exports = exports = express.Router();

router.post('/signup', jsonParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({msg: 'you probably don\'t want a blank password'});

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, data) => {
    if (err) return res.status(500).json({msg: 'could not create user'});

    // TODO (XXX) send a jwt on successful user creation
    res.json({msg: 'user created!'});
  });
});

router.get('/signin', basicHTTP, (req, res) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err) return res.status(500).json({msg: 'authenticat seyz no!'});

    if (!user) return res.status(500).json({msg: 'authenticat seyz no!'});

    if (!user.compareHash(req.auth.password)) return res.status(500).json({msg: 'authenticat seys no'});

    res.json({msg: 'authenticat seys yes'});
  });
});
