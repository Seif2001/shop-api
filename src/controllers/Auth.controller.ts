// controllers/AuthController.ts

import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User from '../Models/User.model';

export class AuthController {
  

  signUp = async (req: Request, res: Response) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);      
      const user = await User.create({ ...req.body, password: hashedPassword });
      
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      
      return res.status(500).json(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user }, 'secret', { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
