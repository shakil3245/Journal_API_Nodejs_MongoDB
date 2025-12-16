const express = require('express');
const { createJournal, getJournals, getJournal, updateJournal, deleteJournal } = require('../controllers/journalController');
const protect = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(protect, getJournals)
  .post(protect, createJournal);

router.route('/:id')
  .get(protect, getJournal)
  .put(protect, updateJournal)
  .delete(protect, deleteJournal);

module.exports = router;