
import {NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../Models/User.model';

export const authenticateUser = (admin:boolean) => {
  return async (req: any, res: any, next: NextFunction) => {
    // Get the token from the request headers
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, 'secret');

      // Check if the user exists in the specified model
      const user = await User.findById(decoded.userId) as IUser;
      

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
