import mongoose, { Schema, Document } from "mongoose";

export interface IQuote extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  address: string;
  city: string;
  postalCode: string;
  description: string;
  urgency: "normal" | "urgent" | "very_urgent";
  photos: string[];
  status: "pending" | "reviewed" | "quoted" | "accepted" | "rejected";
  adminNotes?: string;
  estimatedPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema = new Schema<IQuote>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    serviceType: {
      type: String,
      required: true,
      enum: ["diogene", "insalubre", "post-mortem", "debarras", "autre"],
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    description: { type: String, required: true },
    urgency: {
      type: String,
      enum: ["normal", "urgent", "very_urgent"],
      default: "normal",
    },
    photos: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "reviewed", "quoted", "accepted", "rejected"],
      default: "pending",
    },
    adminNotes: { type: String },
    estimatedPrice: { type: Number },
  },
  { timestamps: true }
);

export const Quote =
  mongoose.models.Quote || mongoose.model<IQuote>("Quote", QuoteSchema);
