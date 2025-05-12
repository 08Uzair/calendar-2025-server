import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
 
  profileImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const user = mongoose.model("user", userSchema);
