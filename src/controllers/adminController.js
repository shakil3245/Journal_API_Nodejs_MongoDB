const Journal = require('../models/Journal');

exports.reviewJournal = async (req, res) => {
  const { status } = req.body;
  const journal = await Journal.findById(req.params.id);
  if (!journal) return res.status(404).json({ message: 'Journal not found' });
  journal.status = status;
  await journal.save();
  res.json(journal);
};