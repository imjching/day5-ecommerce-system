var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  discount: Number,
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema);