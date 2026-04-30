import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { formatDate, pickLocalized } from "@/lib/cms";

const ProjectsList = () => {
  const { t, lang, dir } = useLanguage();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("projects").select("*").eq("published", true)
        .order("published_at", { ascending: false });
      setItems(data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container">
          <header className="mb-10 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary">{t("projects.title")}</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{t("projects.subtitle")}</p>
          </header>
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : items.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">{t("projects.empty")}</Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <Link key={p.id} to={`/projects/${p.id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                    {p.images?.[0] ? (
                      <div className="aspect-video overflow-hidden bg-secondary">
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5" />}
                    <div className="p-5">
                      <h2 className="font-bold text-lg mb-2 line-clamp-2">{pickLocalized(p, "title", lang)}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2">{pickLocalized(p, "description", lang)}</p>
                      {p.completion_date && (
                        <p className="text-xs text-muted-foreground mt-3">
                          {t("projects.completion")}: {formatDate(p.completion_date, lang)}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const ProjectDetail = () => {
  const { id } = useParams();
  const { t, lang, dir } = useLanguage();
  const [p, setP] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const Arrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("projects").select("*").eq("id", id).eq("published", true).maybeSingle();
      setP(data); setLoading(false);
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container max-w-4xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline">
            <Arrow className="h-4 w-4" />{t("projects.back")}
          </Link>
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : !p ? (
            <Card className="p-12 text-center text-muted-foreground">{t("projects.empty")}</Card>
          ) : (
            <article>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">{pickLocalized(p, "title", lang)}</h1>
              {p.completion_date && (
                <p className="text-sm text-muted-foreground mb-6">
                  {t("projects.completion")}: {formatDate(p.completion_date, lang)}
                </p>
              )}
              {p.images?.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {p.images.map((img: string, i: number) => (
                    <img key={i} src={img} alt="" className="w-full rounded-xl aspect-video object-cover" />
                  ))}
                </div>
              )}
              <div className="prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed">
                {pickLocalized(p, "description", lang)}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsList;
