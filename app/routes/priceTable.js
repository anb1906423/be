const express = require('express')
const router = express.Router()
const priceTableController = require('../controllers/priceTableController')
const verifyJWT = require('../middlewares/verifyJWT')

router.route('/add-price-table', [verifyJWT]).post(priceTableController.handleNewPriceTable)
router.route('/delete-price-table', [verifyJWT]).post(priceTableController.deletePriceTable)
router.route('/find-all-price-table').get(priceTableController.getAllPriceTable)
router.route('/update-price-table/:id', [verifyJWT]).put(priceTableController.updatePriceTable)

module.exports = router