import { model, Schema } from "mongoose";

export interface GalleryInterface {
  brandName: string;
  itemDescription: string;
  classification: string;
  price: string;
  image: string;
  createdAt: Date;
}

const GallerySchema = new Schema<GalleryInterface>({
  brandName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  classification: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default model<GalleryInterface>("Gallery", GallerySchema);
