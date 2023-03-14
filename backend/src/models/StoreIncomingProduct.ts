import { model, Schema } from "mongoose";

export interface StoreIncomingProductInterface {
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  pricePerUnit: string;
  dateOfDelivery: Date;
  store: string;
  createdAt: Date;
}

const StoreIncomingProductSchema = new Schema<StoreIncomingProductInterface>({
  productId: { type: String, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: String, required: true },
  dateOfDelivery: { type: Date, required: true },
  store: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<StoreIncomingProductInterface>(
  "StoreIncomingProduct",
  StoreIncomingProductSchema
);
