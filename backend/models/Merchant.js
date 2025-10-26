const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessName: { type: String, default: '' },
  field: { type: String, default: '' },
  description: { type: String, default: '' },
  howTheyCharge: { type: String, default: '' },
  specialities: { type: String, default: '' },
  contactNumber: { type: String, default: '' }, // Remove required: true
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Add password
  images: [{ type: String, default: '' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Merchant', MerchantSchema);