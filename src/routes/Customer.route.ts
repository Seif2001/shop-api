import express from "express";
import controller from '../controllers/Customer.controller';
import { authenticateUser } from "../middleware/auth";


const CustomerRouter = express.Router();
CustomerRouter.get("/products", authenticateUser(false), controller.getProductsByFilter);

export default CustomerRouter;
