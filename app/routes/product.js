const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyJWT = require('../middlewares/verifyJWT');

router.route('/delete', [verifyJWT]).post(productController.deleteProducts);
router.route('/').get(productController.getAllProducts);

router.route('/:id').get(productController.getProduct)
router.route('/:id', [verifyJWT]).put(productController.updateProduct)

module.exports = router; 