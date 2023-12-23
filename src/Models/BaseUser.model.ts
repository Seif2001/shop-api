import mongoose, { Schema, Document } from 'mongoose'; 

export interface IBaseUser extends Document {
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const BaseUser = mongoose.model<IBaseUser>('User', userSchema);

export default BaseUser;
