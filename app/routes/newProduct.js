const express = require('express')
const router = express.Router()
const addProductController = require('../controllers/addProductController')
const verifyJWT = require('../middlewares/verifyJWT')

router.route('/', [verifyJWT]).post(addProductController.handleNewProduct)

module.exports = router