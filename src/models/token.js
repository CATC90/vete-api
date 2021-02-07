const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  token: { type: String },
  createdAt: { type: Date, expires: '15m', default: Date.now }
});

tokenSchema.index({ token: 1 }, { unique: true });

module.exports = mongoose.model('Token', tokenSchema);
