import mongoose, { Schema } from "mongoose";

import { ICard } from "./interface";

const cardSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  cardNumber: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model<ICard>("Card", cardSchema);

export default Card;
