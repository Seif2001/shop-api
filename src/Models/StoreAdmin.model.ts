import mongoose, {Schema, Document} from "mongoose";
import BaseUser, {IBaseUser} from "./BaseUser.model";

export interface IStoreAdmin extends IBaseUser {
    store: string;
}

const storeAdminSchema = new mongoose.Schema({
    store: {type: Schema.Types.ObjectId, ref: 'Store', required: true}
});

const StoreAdmin = BaseUser.discriminator<IStoreAdmin>('StoreAdmin', storeAdminSchema);

export default StoreAdmin;