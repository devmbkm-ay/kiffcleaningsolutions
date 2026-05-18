import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: { fr: string; en: string };
  slug: string;
  excerpt: { fr: string; en: string };
  content: { fr: string; en: string };
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  publishedAt?: Date;
  updatedAt: Date;
  seo: {
    metaTitle?: { fr: string; en: string };
    metaDescription?: { fr: string; en: string };
  };
  readingTime?: number;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    content: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    coverImage: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, default: "Kiff Cleaning Solutions" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    seo: {
      metaTitle: { fr: String, en: String },
      metaDescription: { fr: String, en: String },
    },
    readingTime: { type: Number },
  },
  { timestamps: true }
);

export const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
