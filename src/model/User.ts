import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
}

const MessageSchema: Schema<Message> = new Schema(
  {
    content: { type: String, required: [true, "Content is required"] },
  },
  { timestamps: true }
);

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Please provide a valid email",
      ],
    },
    password: { type: String, required: [true, "Password is required"] },
    isVerified: { type: Boolean, default: false },
    verifyCode: { type: String, required: [true, "Verify Code is required"] },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify Code Expiry is required"],
    },
    isAcceptingMessages: { type: Boolean, default: true },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
