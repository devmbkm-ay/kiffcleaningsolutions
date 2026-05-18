import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Quote } from "@/lib/models/Quote";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const quoteSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().length(5),
  serviceType: z.enum(["diogene", "insalubre", "post-mortem", "debarras", "autre"]),
  description: z.string().min(10),
  urgency: z.enum(["normal", "urgent", "very_urgent"]),
  photos: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = quoteSchema.parse(body);

    await connectDB();

    const quote = await Quote.create(data);

    const urgencyLabels = {
      normal: "Normal (sous 1 semaine)",
      urgent: "Urgent (sous 48h)",
      very_urgent: "Très Urgent (sous 24h) ⚠️",
    };

    const serviceLabels = {
      diogene: "Syndrome de Diogène",
      insalubre: "Logement Insalubre",
      "post-mortem": "Nettoyage Post-Mortem",
      debarras: "Débarras & Évacuation",
      autre: "Autre",
    };

    // Send notification to admin
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Kiff Cleaning Solutions <noreply@kiffcleaningsolutions.com>",
        to: process.env.ADMIN_EMAIL || "contact@kiffcleaningsolutions.com",
        subject: `[DEVIS] Nouvelle demande — ${serviceLabels[data.serviceType]} — ${data.urgency === "very_urgent" ? "⚠️ URGENT" : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0d1b2a;">Nouvelle demande de devis</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Nom :</td><td>${data.firstName} ${data.lastName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email :</td><td>${data.email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Téléphone :</td><td>${data.phone}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Adresse :</td><td>${data.address}, ${data.postalCode} ${data.city}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Service :</td><td>${serviceLabels[data.serviceType]}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Urgence :</td><td>${urgencyLabels[data.urgency]}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Description :</td><td>${data.description}</td></tr>
            </table>
            <p style="margin-top: 16px; color: #627d98; font-size: 12px;">Demande #${quote._id}</p>
          </div>
        `,
      });

      // Confirmation to client
      await resend.emails.send({
        from: "Kiff Cleaning Solutions <noreply@kiffcleaningsolutions.com>",
        to: data.email,
        subject: "Votre demande de devis a bien été reçue — Kiff Cleaning Solutions",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0d1b2a;">Merci pour votre demande, ${data.firstName} !</h2>
            <p>Nous avons bien reçu votre demande de devis pour <strong>${serviceLabels[data.serviceType]}</strong>.</p>
            <p>Notre équipe vous contactera dans les plus brefs délais :</p>
            <ul>
              <li>📞 Très urgent : sous 2 heures</li>
              <li>📞 Urgent : sous 24 heures</li>
              <li>📞 Normal : sous 48 heures</li>
            </ul>
            <p>Pour toute urgence, n'hésitez pas à nous appeler directement :</p>
            <p style="font-size: 20px; font-weight: bold; color: #00a896;">07 70 10 83 39</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #e0e0e0;" />
            <p style="color: #627d98; font-size: 12px;">
              🔒 Vos données sont strictement confidentielles.<br/>
              Kiff Cleaning Solutions — 220 chemin de Crécy, 77100 Mareuil-lès-Meaux
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { success: true, id: quote._id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Quote error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const quotes = await Quote.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ quotes });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
