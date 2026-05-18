import { connectDB } from "@/lib/mongodb";
import { Quote } from "@/lib/models/Quote";
import { Clock, CheckCircle, AlertTriangle, Mail, Phone } from "lucide-react";

async function getQuotes() {
  try {
    await connectDB();
    return await Quote.find().sort({ createdAt: -1 }).limit(100);
  } catch {
    return [];
  }
}

const SERVICE_LABELS: Record<string, string> = {
  diogene: "Syndrome de Diogène",
  insalubre: "Logement Insalubre",
  "post-mortem": "Post-Mortem",
  debarras: "Débarras",
  autre: "Autre",
};

const URGENCY_CONFIG: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-green-100 text-green-700" },
  urgent: { label: "Urgent", className: "bg-amber-100 text-amber-700" },
  very_urgent: { label: "⚠️ Très Urgent", className: "bg-red-100 text-red-700" },
};

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-navy-100 text-navy-700" },
  reviewed: { label: "Vu", className: "bg-blue-100 text-blue-700" },
  quoted: { label: "Devis envoyé", className: "bg-teal-100 text-teal-700" },
  accepted: { label: "Accepté", className: "bg-green-100 text-green-700" },
  rejected: { label: "Refusé", className: "bg-red-100 text-red-700" },
};

export default async function AdminQuotesPage() {
  const quotes = await getQuotes();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-800 text-navy-950">Demandes de Devis</h1>
        <p className="text-navy-500 text-sm mt-1">{quotes.length} demande(s) reçue(s)</p>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-navy-100 p-12 text-center">
          <p className="text-navy-400">Aucune demande de devis pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            serviceType: string;
            city: string;
            postalCode: string;
            urgency: string;
            status: string;
            description: string;
            createdAt: Date;
          }) => (
            <div key={q._id.toString()} className="bg-white rounded-2xl border border-navy-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display font-700 text-navy-950 text-lg">
                    {q.firstName} {q.lastName}
                  </h3>
                  <p className="text-navy-500 text-sm">{q.city} ({q.postalCode})</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${URGENCY_CONFIG[q.urgency]?.className}`}>
                    {URGENCY_CONFIG[q.urgency]?.label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_CONFIG[q.status]?.className}`}>
                    {STATUS_CONFIG[q.status]?.label}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-navy-400 text-xs uppercase tracking-wider">Service</span>
                  <p className="font-medium text-navy-900">{SERVICE_LABELS[q.serviceType]}</p>
                </div>
                <div>
                  <span className="text-navy-400 text-xs uppercase tracking-wider">Contact</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <a href={`tel:${q.phone}`} className="flex items-center gap-1.5 text-teal-600 hover:underline">
                      <Phone size={12} /> {q.phone}
                    </a>
                    <a href={`mailto:${q.email}`} className="flex items-center gap-1.5 text-teal-600 hover:underline truncate">
                      <Mail size={12} /> {q.email}
                    </a>
                  </div>
                </div>
                <div>
                  <span className="text-navy-400 text-xs uppercase tracking-wider">Reçu le</span>
                  <p className="font-medium text-navy-900">
                    {new Date(q.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>

              <div className="bg-navy-50 rounded-xl p-4">
                <span className="text-navy-400 text-xs uppercase tracking-wider block mb-1">Description</span>
                <p className="text-navy-700 text-sm leading-relaxed">{q.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
