const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middlewares/verifyJWT');

router.route('/', [verifyJWT]).get(userController.getAllUser)
router.route('/:fullName', [verifyJWT]).get(userController.getUser)
router.route('/:id', [verifyJWT]).put(userController.update)
router.route('/delete-user', [verifyJWT]).post(userController.deleteUser)

module.exports = router;