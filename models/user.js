import mongoose, { Schema, schema } from "mongoose";
import models from "../models/user";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    file_url: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.Usertable || mongoose.model("Usertable", userSchema);
export default User;
