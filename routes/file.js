const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
// const { v4: uuidv4 } = require('uuid');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('myfile'); //100mb

router.post('/', (req, res) => {
    // store file
    upload(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err); // Add this line for debugging
        return res.status(500).send({ error: err.message });
      }
  
      console.log('req.file:', req.file); // Add this line for debugging
  
      const file = new File({
        filename: req.file.filename,
        uuid: uuidv4(),
        path: req.file.path,
        size: req.file.size
      });
  
      // store into databases
      const response = await file.save();
      res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
    });
  });
  





module.exports = router