import mongoose from "mongoose";

const MerchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessName: { type: String, default: '' },
  field: { type: String, default: '' },
  description: { type: String, default: '' },
  howTheyCharge: { type: String, default: '' },
  specialities: { type: String, default: '' },
  contactNumber: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  images: [{ type: String, default: '' }],
  createdAt: { type: Date, default: Date.now }
});

const Merchant= mongoose.models.Merchant || mongoose.model('Merchant', MerchantSchema);
export default Merchant;