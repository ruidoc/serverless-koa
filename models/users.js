import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  phone: { type: String, unique: true, required: true },
  role: {
    type: String,
    enum: ["member", "manager"],
    required: true,
  },
  group: {
    type: String,
    enum: ["frontend", "backend", "backend2", "product", "all"],
    required: true,
  },
  others: {
    ding_id: {
      type: String,
      default: "",
    },
  },
  created_at: { type: Date, default: Date.now },
});

const model = mongoose.model("users", usersSchema);

export default model;
