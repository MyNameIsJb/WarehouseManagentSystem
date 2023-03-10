import { model, Schema } from "mongoose";

export interface PurchaseInterface {
  dateOfTransaction: Date;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  totalPrice: string;
  createdAt: Date;
}

const PurchaseSchema = new Schema<PurchaseInterface>({
  dateOfTransaction: { type: Date, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<PurchaseInterface>("Purchase", PurchaseSchema);
