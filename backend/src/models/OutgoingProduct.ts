import { model, Schema } from "mongoose";

export interface OutgoingProductInterface {
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  pricePerUnit: string;
  dateOfTransaction: Date;
  store: string;
  createdAt: Date;
}

const OutgoingProductSchema = new Schema<OutgoingProductInterface>({
  productId: { type: String, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: String, required: true },
  dateOfTransaction: { type: Date, required: true },
  store: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<OutgoingProductInterface>(
  "OutgoingProduct",
  OutgoingProductSchema
);
