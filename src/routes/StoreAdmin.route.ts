import { Router } from 'express';
import { GenericController } from "../controllers/Generic.controller";
import StoreAdmin from "../Models/StoreAdmin.model";
import { AuthController } from "../controllers/Auth.controller";


const storeAdminController = new GenericController(StoreAdmin);
const authController = new AuthController(StoreAdmin);

const router = Router();

router.get('/storeAdmins', storeAdminController.getAll);
router.get('/storeAdmins/:id', storeAdminController.getOne);
router.post('/storeAdmins', storeAdminController.create);
router.put('/storeAdmins/:id', storeAdminController.update);
router.delete('/storeAdmins/:id', storeAdminController.delete);

router.post('/storeAdmins/signup', authController.signUp);
router.post('/storeAdmins/login', authController.login);
//create a sample body for testing the signup route
// {
//     "email": "test@test",
//     "password": "test",
//     "firstName": "test",
//     "lastName": "test",
//     "phone": "test"
// }

export default router;
