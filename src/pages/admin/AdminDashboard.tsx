import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";
import { FileText, Newspaper, Briefcase, CheckCircle2, FileEdit } from "lucide-react";

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({ blog: 0, news: 0, projects: 0, published: 0, drafts: 0 });

  useEffect(() => {
    (async () => {
      const [b, n, p] = await Promise.all([
        supabase.from("blog_posts").select("id, published"),
        supabase.from("news_updates").select("id, published"),
        supabase.from("projects").select("id, published"),
      ]);
      const all = [...(b.data || []), ...(n.data || []), ...(p.data || [])];
      setStats({
        blog: b.data?.length || 0,
        news: n.data?.length || 0,
        projects: p.data?.length || 0,
        published: all.filter((x) => x.published).length,
        drafts: all.filter((x) => !x.published).length,
      });
    })();
  }, []);

  const cards = [
    { label: t("admin.stats.blog"), value: stats.blog, icon: FileText, color: "text-blue-600 bg-blue-50" },
    { label: t("admin.stats.news"), value: stats.news, icon: Newspaper, color: "text-emerald-600 bg-emerald-50" },
    { label: t("admin.stats.projects"), value: stats.projects, icon: Briefcase, color: "text-amber-600 bg-amber-50" },
    { label: t("admin.stats.published"), value: stats.published, icon: CheckCircle2, color: "text-green-600 bg-green-50" },
    { label: t("admin.stats.draft"), value: stats.drafts, icon: FileEdit, color: "text-gray-600 bg-gray-100" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("admin.dashboard")}</h1>
        <p className="text-muted-foreground">{t("admin.welcome")} 👋</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${c.color}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="text-3xl font-bold">{c.value}</p>
            <p className="text-sm text-muted-foreground">{c.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
