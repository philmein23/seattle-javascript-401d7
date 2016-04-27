const mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  variety: String,
  fishPreference: {type: String, default: 'salmons'}
});

module.exports = mongoose.model('Bear', bearSchema);
