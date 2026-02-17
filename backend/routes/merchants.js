import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import Merchant from '../models/Merchant.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/create', upload.array('images', 1), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Files received:', req.files || 'None');
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const merchantId = decoded.id;
    
    let merchant = await Merchant.findById(merchantId);
    const isCreated = !merchant;
    
    if (isCreated) {
      merchant = new Merchant({ _id: merchantId });
      console.log('Creating new merchant profile');
    } else {
      console.log('Updating existing merchant profile');
    }
    
    
    const { businessName, field, description, howTheyCharge, specialities, contactNumber } = req.body;
    
    if (businessName !== undefined) merchant.businessName = businessName;
    if (field !== undefined) merchant.field = field;
    if (description !== undefined) merchant.description = description;
    if (howTheyCharge !== undefined) merchant.howTheyCharge = howTheyCharge;
    if (specialities !== undefined) merchant.specialities = specialities;
    if (contactNumber !== undefined) merchant.contactNumber = contactNumber;
    
    if (req.files?.length) {
      const newImageUrls = req.files.map(file => `/uploads/${file.filename}`);
      merchant.images = [...(merchant.images || []), ...newImageUrls];
      console.log('Added new images:', newImageUrls);
    }
    
    await merchant.save();
    console.log('Merchant saved successfully. Images:', merchant.images);
    
    res.json({
      msg: isCreated ? 'Merchant profile created successfully!' : 'Merchant profile updated successfully!',
      merchant
    });
  } catch (err) {
    console.error('Create/Update error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});


router.patch('/me', auth, upload.array('images', 1), async (req, res) => {
  try {
    console.log('Update request body:', req.body);
    console.log('Files received:', req.files || 'None');
    
    const merchant = req.merchant;
    
    const updates = ['businessName', 'field', 'description', 'howTheyCharge', 'specialities', 'contactNumber'];
    updates.forEach(key => {
      if (req.body[key] !== undefined) {
        merchant[key] = req.body[key];
      }
    });
    
    if (req.files?.length) {
      const newImageUrls = req.files.map(file => `/uploads/${file.filename}`);
      merchant.images = [...(merchant.images || []), ...newImageUrls];
    }
    
    await merchant.save();
    console.log('Merchant updated. Images:', merchant.images);
    
    res.json({ msg: 'Merchant profile updated successfully', merchant });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const merchants = await Merchant.find().select('-contactNumber');
    res.json(merchants);
  } catch (err) {
    console.error('Get all error:', err);
    res.status(500).json({ msg: 'Server error' })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ msg: 'Merchant not found' });
    res.json(merchant);
  } catch (err) {
    console.error('Get single error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;