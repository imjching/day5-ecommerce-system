var express = require('express');
var router = express.Router();

var indexController = require('../app/controllers/indexController');
var productsController = require('../app/controllers/productsController');

router.get('/', indexController.show);

router.get('/api/products', productsController._index);
router.post('/api/products', productsController.create);
router.get('/api/products/:product_id', productsController.show);
router.put('/api/products/:product_id', productsController.update);
router.delete('/api/products/:product_id', productsController.destroy);

module.exports = router;