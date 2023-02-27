import { model, Schema } from "mongoose";

export interface ResetTokenInterface {
  email: string;
  resetToken: string;
  createdAt: Date;
}

const ResetTokenSchema = new Schema<ResetTokenInterface>({
  email: { type: String, required: true },
  resetToken: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<ResetTokenInterface>("ResetToken", ResetTokenSchema);
