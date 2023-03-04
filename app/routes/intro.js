const express = require('express');
const router = express.Router();
const introController = require('../controllers/introController');

router.post('/create', introController.handleCreateIntro);
router.put('/update', introController.updateIntro);
router.get('/get-all', introController.getAllIntro);

module.exports = router;