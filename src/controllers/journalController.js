const Journal = require('../models/Journal');

exports.createJournal = async (req, res) => {
  const { title, content } = req.body;
  const journal = await Journal.create({ title, content, author: req.user._id });
  res.status(201).json(journal);
};

exports.getJournals = async (req, res) => {
  const { search, status } = req.query;
  const query = {};
  if (search) query.title = { $regex: search, $options: 'i' };
  if (status) query.status = status;
  const journals = await Journal.find(query).populate('author', 'username email');
  res.json(journals);
};

exports.getJournal = async (req, res) => {
  const journal = await Journal.findById(req.params.id).populate('author', 'username email');
  if (!journal) return res.status(404).json({ message: 'Journal not found' });
  res.json(journal);
};

exports.updateJournal = async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  if (!journal) return res.status(404).json({ message: 'Journal not found' });
  if (journal.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
  Object.assign(journal, req.body);
  await journal.save();
  res.json(journal);
};

exports.deleteJournal = async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  if (!journal) return res.status(404).json({ message: 'Journal not found' });
  if (journal.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
   await journal.deleteOne();
  res.json({ message: 'Journal deleted' });
};