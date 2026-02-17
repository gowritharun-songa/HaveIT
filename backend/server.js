import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import merchantRouter from './routes/merchants.js';

import connectDB from "./config/db.js";

dotenv.config({
  silent: true,
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
app.use('/api/auth', authRouter);
app.use('/api/merchants', merchantRouter);

const PORT = process.env.PORT || 5050;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT", ${PORT}`);
  })
})