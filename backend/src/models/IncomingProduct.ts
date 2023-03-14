import { model, Schema } from "mongoose";

export interface IncomingProductInterface {
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  totalPrice: string;
  dateOfTransaction: Date;
  createdAt: Date;
}

const IncomingProductSchema = new Schema<IncomingProductInterface>({
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: String, required: true },
  dateOfTransaction: { type: Date, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<IncomingProductInterface>(
  "IncomingProduct",
  IncomingProductSchema
);
