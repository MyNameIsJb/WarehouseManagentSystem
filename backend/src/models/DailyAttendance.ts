import { model, Schema } from "mongoose";

export interface DailyAttendanceInterface {
  name: string;
  activity: string;
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  dateOfActivity: Date;
  createdAt: Date;
}

const DailyAttendanceSchema = new Schema<DailyAttendanceInterface>({
  name: { type: String, required: true },
  activity: { type: String, required: true },
  productId: { type: String, default: "N/A" },
  brandName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true },
  dateOfActivity: { type: Date, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<DailyAttendanceInterface>(
  "DailyAttendance",
  DailyAttendanceSchema
);
