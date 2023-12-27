import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import User from "../Models/User.model";
import Product from "../Models/Product.model";
import Logger from "../library/logging";

const getCustomer = async (req: Request, res: Response) => {
    try {
      const item = await User.findById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
};


const updateCustomer = async (req: Request, res: Response) => {
    try {
      const item = await User.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
};

const deleteCustomer = async (req:Request, res:Response)=>{
    try {
        const item = await User.deleteOne({ _id: req.params.id }, req.body);
        return res.status(200).json(item);
      } catch (error) {
        return res.status(500).json(error);
      }
}

const getProductsByFilter = async (req: Request, res: Response) => {
    try {
      const {store, sortBy} = req.query;
      let items = await Product.find();
      
      if (store && sortBy && sortBy === "priceAsc") {
        const storeObj = await User.findOne({name: store})
        items = await Product.find({ store: storeObj.id }).sort({price: 1}).exec();
      }else if (store && sortBy && sortBy === "priceDesc") {
        const storeObj = await User.findOne({name: store})
        items = await Product.find({ store: storeObj.id }).sort({price: -1}).exec();
      }else if (store && sortBy && sortBy === "nameAsc") {
        const storeObj = await User.findOne({name: store})
        items = await Product.find({ store: storeObj.id }).sort({name: 1}).exec();
      }
      else if (store && sortBy && sortBy === "nameDesc") {
        const storeObj = await User.findOne({name: store})
        items = await Product.find({ store: storeObj.id }).sort({name: -1}).exec();
      }else if (store) {
        const storeObj = await User.findOne({name: store})
        items = await Product.find({ store: storeObj.id });
      }
      else if (sortBy) {
        items = await Product.find().sort({price: ( sortBy === "priceAsc" )? 1: -1, name: ( sortBy === "nameAsc" ) ? 1: -1}).exec();
      }
      
      return res.status(200).json(items);

    } catch (error) {
      return res.status(500).json(error);
    }
}

export default {
    getCustomer,
    updateCustomer,
    deleteCustomer,
    getProductsByFilter
}