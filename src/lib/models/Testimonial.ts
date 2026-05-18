import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  location: string;
  serviceType: string;
  rating: number;
  content: { fr: string; en: string };
  published: boolean;
  featured: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    serviceType: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
