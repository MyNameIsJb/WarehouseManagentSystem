import { model, Schema } from "mongoose";

export interface ProductInterface {
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  pricePerUnit: string;
  createdAt: Date;
}

const ProductSchema = new Schema<ProductInterface>({
  productId: { type: String, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<ProductInterface>("Product", ProductSchema);
