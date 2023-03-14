import { model, Schema } from "mongoose";

export interface StoreInventoryInterface {
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  wareHousePrice: string;
  storePrice: string;
  store: string;
  createdAt: Date;
}

const StoreInventorySchema = new Schema<StoreInventoryInterface>({
  productId: { type: String, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  wareHousePrice: { type: String, required: true },
  storePrice: { type: String, default: "N/A" },
  store: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<StoreInventoryInterface>(
  "StoreInventory",
  StoreInventorySchema
);
