import { model, Schema } from "mongoose";

export interface ReturnedItemInterface {
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  reason: string;
  store: string;
  returnedDate: Date;
  createdAt: Date;
}

const ReturnedItemSchema = new Schema<ReturnedItemInterface>({
  productId: { type: String, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  reason: { type: String, required: true },
  store: { type: String, required: true },
  returnedDate: { type: Date, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<ReturnedItemInterface>("ReturnedItem", ReturnedItemSchema);
