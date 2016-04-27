module.exports = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'dude, your server errored'});
};
