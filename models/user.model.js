import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter User Fullname"],
    },
    email: {
      type: String,
      required: [true, "Please Enter User Email Address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter User Password"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPassowrdToken: String,
    resetPassowrdExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
