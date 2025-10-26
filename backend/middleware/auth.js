const jwt = require('jsonwebtoken');
const Merchant = require('../models/Merchant');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const merchant = await Merchant.findById(decoded.id);
    if (!merchant) return res.status(401).json({ msg: 'Token is not valid' });

    req.merchant = merchant;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};