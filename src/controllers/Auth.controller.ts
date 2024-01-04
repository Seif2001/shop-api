// controllers/AuthController.ts

import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User from '../Models/User.model';
import Logger from '../library/logging';

export class AuthController {
  

  signUp = async (req: Request, res: Response) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);      
      const user = await User.create({ ...req.body, password: hashedPassword });
      const token = jwt.sign({ user: user }, 'secret', { expiresIn: '1h' });
      console.log(token);
      return res.status(201).json(token);
    } catch (error) {
      console.log(error);
      
      return res.status(500).json(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { phone, password } = req.body;
      const user = await User.findOne({ phone });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ user: user }, 'secret');

      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  getUser = async (req: Request, res: Response) => {
    //get user by the header token

    try {
      let token = req.header('Authorization')?.replace('Bearer ', '');
      token =  token.replace(/"/g, '');
      Logger.info(token);
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
      const decoded = jwt.verify(token, 'secret');
      Logger.info(decoded);
      const user = await User.findById(decoded.user._id);
      return res.status(200).json(user);
    } catch (error) {
      Logger.error(error);
      return res.status(500).json(error);
    }
  };

  checkPhone = async (req: Request, res: Response) => {
    try {
      const {phone} = req.body;
      const user = User.find({phone: phone});
      if((await user).length > 0){
        return res.status(200).json({found: "true"});
      }
      else{
        return res.status(200).json({found: "false"});
      }
    }catch(error){
      Logger.error(error);
      return res.status(500).json(error);
    }
  }

 

}
