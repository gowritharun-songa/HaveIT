import multer from "multer";

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    if (req.files.length < 2) {
      cb(null, `image1-${uniqueSuffix}${path.extname(file.originalname)}`);
    } else if (req.files.length === 1) {
      cb(null, `image1-${uniqueSuffix}${path.extname(file.originalname)}`);
    } else {
      cb(null, `image${req.files.length}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  }
});

const upload = multer({ storage });
export default upload;