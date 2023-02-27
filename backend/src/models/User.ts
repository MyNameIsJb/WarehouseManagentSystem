import { model, Schema } from "mongoose";

export interface UserInterface {
  username: string;
  password: string;
  name: string;
  email: string;
  address: string;
  birthDate: Date;
  contactNumber: string;
  levelOfAccess: string;
  store: string | null;
  createdAt: Date;
}

const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true },
  password: { type: String, default: "" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  birthDate: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  levelOfAccess: { type: String, required: true },
  store: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

export default model<UserInterface>("User", UserSchema);
