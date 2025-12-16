const express = require('express');
const { reviewJournal } = require('../controllers/adminController');
const protect = require('../middleware/auth');
const authorize = require('../middleware/roles');
const router = express.Router();

router.put('/journal/:id', protect, authorize('admin'), reviewJournal);

module.exports = router;