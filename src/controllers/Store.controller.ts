import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import User from "../Models/User.model";
import Product from "../Models/Product.model";
import Logger from "../library/logging";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storeId = req.params.storeId;
        const store = await User.findById(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const product = {
            ...req.body,
            store: storeId
        };
        await Product.create(product);

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}
const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stores = await User.find({ isStore:true }).select({name:1});
        Logger.info(stores);
        res.status(200).json(stores);
    } catch (error) {
        next(error);
    }
}
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storeId = req.params.storeId;
        const store = await User.findById(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const products = await Product.find({ store: storeId });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storeId = req.params.storeId;
        const store = await User.findById(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const productId = req.params.productId;
        const product = await Product.findOneAndUpdate({ _id: productId, store: storeId }, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storeId = req.params.storeId;
        const store = await User.findById(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const productId = req.params.productId;
        await Product.findOneAndDelete({ _id: productId, store: storeId });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export default {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getAllStores
};