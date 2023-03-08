import { model, Schema } from "mongoose";

export interface OrderProductInterface {
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  store: string;
  orderedDate: Date;
  createdAt: Date;
}

const OrderProductSchema = new Schema<OrderProductInterface>({
  productId: { type: String, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  store: { type: String, required: true },
  orderedDate: { type: Date, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<OrderProductInterface>("OrderProduct", OrderProductSchema);
