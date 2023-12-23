import mongoose, {Document, Schema} from "mongoose";

export interface IProduct extends Document {
    name: string;
    image: string;
    price: number;
    store: string;
}

const productSchema: Schema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    store: {type: Schema.Types.ObjectId, ref: 'Store', required: true}
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;