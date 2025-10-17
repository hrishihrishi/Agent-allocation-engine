const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  firstName: String,
  phone: String,
  email: String,
  notes: String
});

module.exports = mongoose.model('Task', TaskSchema);
