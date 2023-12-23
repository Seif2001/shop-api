import { Router } from "express";
import { GenericController } from "../controllers/Generic.controller";
import Customer from "../Models/Customer.model";
import { AuthController } from "../controllers/Auth.controller";

const customerController = new GenericController(Customer);
const authController = new AuthController(Customer);

const router = Router();

router.get("/customers", customerController.getAll);
router.get("/customers/:id", customerController.getOne);
router.post("/customers", customerController.create);
router.put("/customers/:id", customerController.update);
router.delete("/customers/:id", customerController.delete);

// Add authentication routes
router.post('/customers/signup', authController.signUp);
router.post('/customers/login', authController.login);
export default router;
