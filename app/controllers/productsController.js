var Product = require('../models/product');

function validationErrors(err, _default) {
  var message = _default;
  if (err.errors) {
    var errArray = []
    for (var i in err.errors) {
      errArray.push(err.errors[i].message);
    }
    message = errArray.join(' ');
  }
  return message;
}

exports._index = function(req, res, next){
  Product.find(function(err, products) {
    if (err) {
      res.status(404).send({ error : 'Unable to retrieve all products' });
    } else {
      res.json(products);
    }
  });
};

exports.create = function(req, res, next){
  var product = new Product({
    name: req.body.name,
    price: req.body.price,
    discount: req.body.discount
  });

  product.save(function(err, product) {
    if (err) {
      res.status(404).send({ error : validationErrors(err, 'Unable to add a new product') });
    } else {
      res.json({ message: 'Product added!', product: product });
    }
  });

  // to see what is being sent from the client
  console.log(req.body);
};

exports.show = function(req, res, next){
  Product.findById(req.params.product_id, function(err, product) {
    if (err) {
      res.status(404).send({ error : 'Unable to find product!' });
    } else {
      res.json(product);
    }
  });
};

exports.update = function(req, res, next){
  Product.findById(req.params.product_id, function(err, product) {
    if (product) {
      product.name = req.body.name,
      product.price = req.body.price,
      product.discount = req.body.discount

      product.save(function(err) {
        if (err) {
          res.status(404).send({ error : validationErrors(err, 'Unable to find product!') });
        } else {
          res.json({ message: 'Product updated!', product: product });
        }
      });
    } else {
      res.status(404).send({ error : 'Unable to find product!' });
    }
  });

  // to see what is being sent from the client
  console.log(req.body);
};

exports.destroy = function(req, res, next){
  Product.findById(req.params.product_id, function(err, product) {
    if (err) {
      res.status(404).send({ error : 'Unable to find product!' });
    } else {
      product.remove(function(err) {
        if (err) {
          res.status(404).send({ error : 'Error deleting product!' });
        } else {
          res.json({ message: 'Product deleted!' });
        }
      });
    }
  });
};