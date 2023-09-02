import mongoose from "mongoose";

const amountSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    option: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
    },
    amount_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Amount = mongoose.model("amounts", amountSchema);
