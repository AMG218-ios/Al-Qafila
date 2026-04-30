import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Newspaper, Briefcase, Users, LogOut, ExternalLink, Globe } from "lucide-react";
import logo from "@/assets/logo-icon.png";

const AdminLayout = () => {
  const { t, lang, setLang, dir } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const items = [
    { to: "/admin", label: t("admin.dashboard"), icon: LayoutDashboard, end: true },
    { to: "/admin/blog", label: t("admin.blog"), icon: FileText },
    { to: "/admin/news", label: t("admin.news"), icon: Newspaper },
    { to: "/admin/projects", label: t("admin.projects"), icon: Briefcase },
    { to: "/admin/users", label: t("admin.users"), icon: Users },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex w-full bg-muted/20" dir={dir}>
      <aside className="hidden lg:flex w-64 flex-col border-e bg-card">
        <Link to="/admin" className="flex items-center gap-3 p-6 border-b">
          <img src={logo} alt="" className="h-10 w-auto" />
          <div>
            <p className="font-bold text-primary leading-tight">{t("admin.title")}</p>
            <p className="text-xs text-muted-foreground">Al-Qafila CMS</p>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary"
                }`
              }
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link to="/"><ExternalLink className="h-4 w-4" />{t("admin.viewSite")}</Link>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />{t("admin.logout")}
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-card border-b px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="lg:hidden flex items-center gap-2">
            <img src={logo} alt="" className="h-8" />
            <span className="font-bold text-primary">{t("admin.title")}</span>
          </div>
          <div className="hidden lg:block text-sm text-muted-foreground">
            {t("admin.welcome")}, <span className="font-medium text-foreground">{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === "ar" ? "EN" : "ع"}
            </button>
          </div>
        </header>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-card border-t z-20 grid grid-cols-5">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 text-[10px] ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              <it.icon className="h-5 w-5" />
              {it.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
