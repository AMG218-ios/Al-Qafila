import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { formatDate, pickLocalized } from "@/lib/cms";

const News = () => {
  const { t, lang, dir } = useLanguage();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("news_updates").select("*").eq("published", true)
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
            <h1 className="text-4xl lg:text-5xl font-bold text-primary">{t("news.title")}</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{t("news.subtitle")}</p>
          </header>
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : items.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">{t("news.empty")}</Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {items.map((n) => (
                <Card key={n.id} className="overflow-hidden hover:shadow-lg transition-all">
                  {n.image && (
                    <div className="aspect-video overflow-hidden bg-secondary">
                      <img src={n.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground mb-2">{formatDate(n.published_at || n.created_at, lang)}</p>
                    <h2 className="font-bold text-xl mb-3">{pickLocalized(n, "title", lang)}</h2>
                    <p className="text-muted-foreground whitespace-pre-wrap">{pickLocalized(n, "description", lang)}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
