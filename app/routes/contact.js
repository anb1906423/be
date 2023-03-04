const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/create', contactController.handleCreateContact);
router.put('/update/:id', contactController.updateContact);
router.get('/get-all', contactController.getAllContact);

module.exports = router;