var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
  name: { type: String,
          required: [true, 'Please input a product name.'],
          minlength: [5, 'The product name is required to be at least 5 characters.'],
          maxlength: [60, 'The product name cannot be longer than 60 characters.'] },
  price: { type: Number,
           required: [true, 'Please input a product price.'] },
  discount: { type: Number,
              required: [true, 'Please input a product discount.'],
              validate: [checkDiscount, 'Product discount must lie within 0 and 0.99 (inclusive), with two decimal places.'] },
  created_at: { type: Date,
                default: Date.now }
});

// ensure that the value v matches 0.XX or 0
function checkDiscount(v) {
  return /^0(\.[0-9]{1,2})?$/.test(v.toString());
}

var updated_at = require('./updated_at_plugin');
ProductSchema.plugin(updated_at);

module.exports = mongoose.model('Product', ProductSchema);