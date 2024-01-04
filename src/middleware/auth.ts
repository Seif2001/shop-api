
import {NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../Models/User.model';
import Logger from '../library/logging';

export const authenticateUser = (admin:boolean) => {
  return async (req: any, res: any, next: NextFunction) => {
    // Get the token from the request headers
    let token = req.header('Authorization')?.replace('Bearer ', '');
    token = token.replace(/"/g, '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, 'secret');
      // Check if the user exists in the specified model
      const user = await User.findById(decoded.user._id) as IUser;
      

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
      if(!user.isStore && admin){
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
      // Attach the user information to the request for further use in controllers
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};
