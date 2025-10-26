const express = require('express');
const multer = require('multer');
const Merchant = require('../models/Merchant');
const auth = require('../middleware/auth');
const router = express.Router();

// Multer for multiple images
const upload = multer({ dest: 'uploads/' });

// Create Merchant (protected)
router.post('/create', auth, upload.array('images', 2), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Files received:', req.files); // Log all file details
    const { businessName, field, description, howTheyCharge, specialities, contactNumber } = req.body;
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    console.log('Generated image URLs:', imageUrls); // Log URLs

    const merchant = await Merchant.findById(req.merchant.id);
    if (!merchant) return res.status(404).json({ msg: 'Merchant not found' });

    merchant.businessName = businessName || merchant.businessName;
    merchant.field = field || merchant.field;
    merchant.description = description || merchant.description;
    merchant.howTheyCharge = howTheyCharge || merchant.howTheyCharge;
    merchant.specialities = specialities || merchant.specialities;
    merchant.contactNumber = contactNumber || merchant.contactNumber;
    merchant.images = imageUrls.length ? imageUrls : merchant.images;

    await merchant.save();
    console.log('Merchant saved with images:', merchant.images);
    res.json({ msg: 'Merchant updated successfully', images: merchant.images });
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all merchants
router.get('/', async (req, res) => {
  try {
    const merchants = await Merchant.find().select('-contactNumber -password'); // Exclude sensitive fields
    res.json(merchants);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get single merchant
router.get('/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id).select('-contactNumber -password');
    if (!merchant) return res.status(404).json({ msg: 'Merchant not found' });
    res.json(merchant);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;