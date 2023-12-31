import express from 'express';

import controller from '../controllers/Store.controller';

const storeAdminRouter = express.Router();

const multer = require('multer');

// Set up multer to store files in a 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage: storage });


storeAdminRouter.post('/createProduct/:storeId', upload.single('image'),controller.createProduct);
storeAdminRouter.get('/getProducts/:storeId', controller.getProducts);
storeAdminRouter.get('/', controller.getAllStores);

export = storeAdminRouter;
