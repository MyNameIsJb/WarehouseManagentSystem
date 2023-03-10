import { model, Schema } from "mongoose";

export interface BarcodeGeneratorInterface {
  userId: string;
  productId: string;
  createdAt: Date;
}

const BarcodeGeneratorSchema = new Schema<BarcodeGeneratorInterface>({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<BarcodeGeneratorInterface>(
  "BarcodeGenerator",
  BarcodeGeneratorSchema
);
