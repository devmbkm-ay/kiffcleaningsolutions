import { connectDB } from "@/lib/mongodb";
import { Quote } from "@/lib/models/Quote";
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";

async function getDashboardStats() {
  try {
    await connectDB();
    const [total, pending, urgent] = await Promise.all([
      Quote.countDocuments(),
      Quote.countDocuments({ status: "pending" }),
      Quote.countDocuments({ urgency: "very_urgent", status: "pending" }),
    ]);
    const recentQuotes = await Quote.find().sort({ createdAt: -1 }).limit(5);
    return { total, pending, urgent, recentQuotes };
  } catch {
    return { total: 0, pending: 0, urgent: 0, recentQuotes: [] };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const STAT_CARDS = [
    { label: "Total Devis", value: stats.total, icon: FileText, color: "teal" },
    { label: "En Attente", value: stats.pending, icon: Clock, color: "amber" },
    { label: "Très Urgents", value: stats.urgent, icon: AlertTriangle, color: "red" },
    { label: "Traités", value: stats.total - stats.pending, icon: CheckCircle, color: "green" },
  ];

  const SERVICE_LABELS: Record<string, string> = {
    diogene: "Syndrome de Diogène",
    insalubre: "Logement Insalubre",
    "post-mortem": "Post-Mortem",
    debarras: "Débarras",
    autre: "Autre",
  };

  const URGENCY_LABELS: Record<string, string> = {
    normal: "Normal",
    urgent: "Urgent",
    very_urgent: "⚠️ Très Urgent",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-800 text-navy-950">Tableau de Bord</h1>
        <p className="text-navy-500 text-sm mt-1">Vue d&apos;ensemble de l&apos;activité</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-6 border border-navy-100">
            <div className={`w-10 h-10 rounded-xl bg-${color}-100 flex items-center justify-center mb-3`}>
              <Icon size={20} className={`text-${color}-600`} />
            </div>
            <div className="text-3xl font-display font-800 text-navy-950 mb-1">{value}</div>
            <div className="text-navy-500 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent quotes */}
      <div className="bg-white rounded-2xl border border-navy-100 p-6">
        <h2 className="font-display font-700 text-navy-950 mb-4">Dernières Demandes</h2>
        {stats.recentQuotes.length === 0 ? (
          <p className="text-navy-400 text-sm">Aucune demande pour l&apos;instant.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-navy-400 text-xs uppercase tracking-wider border-b border-navy-100">
                  <th className="pb-3 pr-4">Client</th>
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Ville</th>
                  <th className="pb-3 pr-4">Urgence</th>
                  <th className="pb-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {stats.recentQuotes.map((q: { _id: string; firstName: string; lastName: string; serviceType: string; city: string; urgency: string; status: string }) => (
                  <tr key={q._id} className="py-3">
                    <td className="py-3 pr-4 font-medium text-navy-900">{q.firstName} {q.lastName}</td>
                    <td className="py-3 pr-4 text-navy-600">{SERVICE_LABELS[q.serviceType] || q.serviceType}</td>
                    <td className="py-3 pr-4 text-navy-600">{q.city}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${q.urgency === "very_urgent" ? "bg-red-100 text-red-700" : q.urgency === "urgent" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                        {URGENCY_LABELS[q.urgency]}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${q.status === "pending" ? "bg-navy-100 text-navy-700" : "bg-teal-100 text-teal-700"}`}>
                        {q.status === "pending" ? "En attente" : q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
