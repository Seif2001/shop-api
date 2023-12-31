import express from 'express';

import controller from '../controllers/Store.controller';

const storeAdminRouter = express.Router();

storeAdminRouter.post('/createProduct/:storeId', controller.createProduct);
storeAdminRouter.get('/getProducts/:storeId', controller.getProducts);
storeAdminRouter.get('/', controller.getAllStores);
// create json to test create product
// {
//     "name": "Product 1",
//     "image": "https://picsum.photos/200",
//     "price": 100
// }
export = storeAdminRouter;
