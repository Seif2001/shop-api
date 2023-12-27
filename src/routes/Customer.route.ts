import express from "express";
import controller from '../controllers/Customer.controller';


const CustomerRouter = express.Router();

CustomerRouter.get("/products", controller.getProductsByFilter);

export default CustomerRouter;
