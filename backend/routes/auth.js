import express from 'express';
import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
import Merchant from '../models/merchant.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { email, password, name, contactNumber } = req.body;
    if (!email || !password || !name || !contactNumber) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }
    let merchant = await Merchant.findOne({ email });
    if (merchant) return res.status(400).json({ msg: 'Merchant already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    merchant = new Merchant({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      businessName: '',
      field: '',
      description: '',
      howTheyCharge: '',
      specialities: '',
      images: []
    });
    await merchant.save();

    const payload = { id: merchant.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const merchant = await Merchant.findOne({ email });
    if (!merchant) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, merchant.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { id: merchant.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;