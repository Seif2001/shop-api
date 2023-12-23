import mongoose from "mongoose";
import BaseUser, { IBaseUser } from "./BaseUser.model";

export interface ICustomer extends IBaseUser {
    address: string;
}

const customerSchema = new mongoose.Schema({
    address: { type: String, required: true }
});

const Customer = BaseUser.discriminator<ICustomer>('Customer', customerSchema);

export default Customer;

