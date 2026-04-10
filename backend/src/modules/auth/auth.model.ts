import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { CLIENT, ASSISTANT, ADMIN } from "../../utils/constants";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: typeof CLIENT | typeof ASSISTANT | typeof ADMIN;
  city: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    
    role: {
      type: String,
      enum: [CLIENT, ASSISTANT, ADMIN],
      default: CLIENT,
      required: true,
    },
    city:{type:String, required:true},
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
});

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model<IUser>("User", UserSchema);
