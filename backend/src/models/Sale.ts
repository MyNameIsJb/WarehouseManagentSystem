import { model, Schema } from "mongoose";

export interface SaleInterface {
  dateOfTransaction: Date;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  totalPrice: string;
  nameOfStore: string;
  createdAt: Date;
}

const SaleSchema = new Schema<SaleInterface>({
  dateOfTransaction: { type: Date, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: String, required: true },
  nameOfStore: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<SaleInterface>("Sale", SaleSchema);
