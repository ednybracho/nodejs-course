const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
// const adminData = require('./admin');

const shopsController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopsController.getIndex);

router.get('/products', shopsController.getProducts);

router.get('/products/:productId', shopsController.getProduct);

router.get('/cart', shopsController.getCarts);

router.post('/cart', shopsController.postCarts);

router.get('/checkout', shopsController.getCheckout);

router.get('/orders', shopsController.getOrders);

router.post('/cart-delete-item', shopsController.postCartsDeleteItems);

router.post('/create-order', shopsController.postOrder);

module.exports = router;
