const app = require('express')();
const mongoose = require('mongoose');


app.get('*', (req, res) => {
  res.send('this is the only route');
});

module.exports = exports = function(port, mongoConnString, cb) {
  mongoose.connect(mongoConnString);
  return app.listen(port, cb);
};
