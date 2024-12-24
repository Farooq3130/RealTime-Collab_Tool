const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  content: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Document', documentSchema);
