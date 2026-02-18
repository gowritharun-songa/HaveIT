import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import FormData from 'form-data';
import Merchant from '../models/Merchant.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

router.post('/create', upload.array('images', 5), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Files received:', req.files?.length || 0);

    // Token check
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const merchantId = decoded.id;

    // Find or create merchant
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

    // Handle image uploads to ImgBB
    let newImageUrls = [];

    if (req.files?.length) {
      console.log(`Uploading ${req.files.length} images to ImgBB...`);

      for (const file of req.files) {
        try {
          const form = new FormData();
          form.append('image', file.buffer, file.originalname);

          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            form,
            { headers: form.getHeaders() }
          );

          if (response.data.success) {
            const url = response.data.data.url;
            newImageUrls.push(url);
            console.log('ImgBB success:', url);
          } else {
            console.error('ImgBB failed for file:', file.originalname, response.data);
          }
        } catch (uploadErr) {
          console.error('ImgBB upload error:', uploadErr.message);
        }
      }

      // Append new URLs to existing ones (or replace if you prefer)
      merchant.images = [...(merchant.images || []), ...newImageUrls];
      console.log('Added new images:', newImageUrls);
    }

    // Save
    await merchant.save();
    console.log('Merchant saved. Total images:', merchant.images?.length || 0);

    res.json({
      msg: isCreated ? 'Merchant profile created successfully!' : 'Merchant profile updated successfully!',
      merchant
    });
  } catch (err) {
    console.error('Create/Update error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.patch('/me', auth, upload.array('images', 5), async (req, res) => {
  try {
    console.log('Update request body:', req.body);
    console.log('Files received:', req.files?.length || 0);

    const merchant = req.merchant;

    // Update text fields
    const updates = ['businessName', 'field', 'description', 'howTheyCharge', 'specialities', 'contactNumber'];
    updates.forEach(key => {
      if (req.body[key] !== undefined) {
        merchant[key] = req.body[key];
      }
    });

    // ImgBB upload for new images
    let newImageUrls = [];

    if (req.files?.length) {
      for (const file of req.files) {
        try {
          const form = new FormData();
          form.append('image', file.buffer, file.originalname);

          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            form,
            { headers: form.getHeaders() }
          );

          if (response.data.success) {
            newImageUrls.push(response.data.data.url);
          }
        } catch (err) {
          console.error('ImgBB error in /me:', err.message);
        }
      }

      merchant.images = [...(merchant.images || []), ...newImageUrls];
    }

    await merchant.save();

    res.json({ msg: 'Merchant profile updated successfully', merchant });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// GET routes (unchanged)
router.get('/', async (req, res) => {
  try {
    const merchants = await Merchant.find().select('-contactNumber');
    res.json(merchants);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ msg: 'Merchant not found' });
    res.json(merchant);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;