// controllers/AuthController.ts

import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IBaseUser } from '../Models/BaseUser.model';

export class AuthController<T extends Document> {
  private model: Model<IBaseUser>;

  constructor(model: Model<IBaseUser>) {
    this.model = model;
  }

  signUp = async (req: Request, res: Response) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await this.model.create({ ...req.body, password: hashedPassword });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.model.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
