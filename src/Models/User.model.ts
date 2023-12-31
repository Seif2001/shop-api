import mongoose, { Schema, Document } from 'mongoose'; 

export interface IUser extends Document {
    phone: string;
    password: string;
    name: string;
    isStore: boolean;
    address: string;
}

const userSchema: Schema = new Schema({
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isStore: { type: Boolean, required: true },
    address: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
