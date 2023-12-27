import express from "express";

import { AuthController } from "../controllers/Auth.controller";

const authRouter = express.Router();

const authController = new AuthController();

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.login);

export = authRouter;
