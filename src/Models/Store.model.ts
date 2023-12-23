import mongoose, {Schema, Document} from "mongoose";

export interface IStore extends Document {
    name: string;
    address: string;
}

const storeSchema: Schema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true}
});

const Store = mongoose.model<IStore>('Store', storeSchema);

export default Store;