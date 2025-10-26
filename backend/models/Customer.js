const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  whatTheyDo: { type: String, required: true },
  specialities: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Customer', CustomerSchema);