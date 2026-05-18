import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LayoutDashboard, FileText, Image, BookOpen, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/quotes", icon: FileText, label: "Devis" },
  { href: "/admin/gallery", icon: Image, label: "Galerie" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-navy-50">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-950 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Logo variant="light" />
          <p className="text-navy-400 text-xs mt-2">Administration</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-navy-300 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-navy-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
