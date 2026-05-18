import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: { fr: string; en: string };
  category: "diogene" | "insalubre" | "post-mortem" | "debarras";
  beforeImage: string;
  afterImage: string;
  description?: { fr: string; en: string };
  featured: boolean;
  order: number;
  createdAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    category: {
      type: String,
      required: true,
      enum: ["diogene", "insalubre", "post-mortem", "debarras"],
    },
    beforeImage: { type: String, required: true },
    afterImage: { type: String, required: true },
    description: {
      fr: String,
      en: String,
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GalleryItem =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
