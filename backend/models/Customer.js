
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  whatTheyDo: { type: String, required: true },
  specialities: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true }
});

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;