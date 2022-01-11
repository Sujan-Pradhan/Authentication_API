const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 16,
      min: 6,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
