const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  timezone: String
});

module.exports = mongoose.model('Availability', schema);
