const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipientSchema = new Schema({

  email: String,
  responded: { type: Boolean, default: false }
});

// const Recipient = mongoose.model('recipients', recipientSchema);

module.exports = recipientSchema;