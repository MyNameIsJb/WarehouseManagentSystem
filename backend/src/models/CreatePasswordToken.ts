import { model, Schema } from "mongoose";

export interface CreatePasswordToken {
  email: string;
  createPasswordToken: string;
  createdAt: Date;
}

const CreatePasswordToken = new Schema<CreatePasswordToken>({
  email: { type: String, required: true },
  createPasswordToken: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<CreatePasswordToken>(
  "CreatePasswordToken",
  CreatePasswordToken
);
