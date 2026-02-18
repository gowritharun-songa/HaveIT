import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import Merchant from '../models/Merchant.js';
import auth from '../middleware/auth.js';

// for images
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

// const upload = multer({ dest: 'uploads/' });
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 5 * 1024 * 1024},
});

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
    
    // find or create merchant
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
    
    /*if (req.files?.length) {
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
  }*/
    
    let newImageUrls = [];

    if(req.files?.length) {
      console.log(`Uploading ${req.files.length} images to ImageBB`);

      for(const file of req.files) {
        try {
          const form = new FormData();
          form.append('image', file.buffer, file.originalname);

          const responce = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            form, 
            { headers: form.getHeaders() }
          );

          if(responce.data.success) {
            const url = responce.data.data.url;
            newImageUrls.push(url);
            console.log("ImgBB success", url);
          } else {
            console.error('ImgBB failed for file', file.orignalname, responce.data);
          }
        } catch(uploadErr) {
          console.error("Img BB uplaod error: ", uploadErr.message);
        }
      }

      merchant.images = [... (merchant.images || []), ...newImageUrls];
      console.log("Added new images: ", newImageUrls);
    }

    await merchant.save();
    console.log("Merchant saved");

    res.json({
      message: isCreated ? "Merchant profile created successfully" : "Merchant profile updated successfully",
      merchant
    });
  } catch(error) {
    console.error("Create/Update error: ", error);
    res.status(500).json({
      message: "Server error", 
      error: error.message
    })
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
    
    let newImageUrls = [];

    if(req.files?.length) {
      for(const file of req.files) {
        try {
          const form = new FormData();
          form.append('image', file.buffer, file.originalname);

          const responce = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            form,
            { headers: form.getHeaders() }
          );

          if(responce.data.success) {
            newImageUrls.push(responce.data.data.urls);
          }
        } catch(error) {
          console.log("Image BB error in /me: ", error.message);
        }
      }
      merchant.images = [...(merchant.images || []), ...newImageUrls];
    }

    await merchant.save();

    res.json({
      message: "Merchant profile updated successfully", merchant
    });
  } catch(error) {
    console.error("Updated error", error);
    res.status(500).json({
      message: "Server error: ", 
      error: error.message
    });
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