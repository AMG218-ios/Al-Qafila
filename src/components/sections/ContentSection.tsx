import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { formatDate, pickLocalized } from "@/lib/cms";

interface Item {
  id: string; title_ar: string; title_en: string | null;
  content_ar?: string; content_en?: string | null;
  description_ar?: string; description_en?: string | null;
  featured_image?: string | null; image?: string | null; images?: string[];
  category?: string | null; completion_date?: string | null;
  published_at: string | null; created_at: string;
}

interface Props {
  table: "blog_posts" | "news_updates" | "projects";
  limit: number;
  title: string;
  subtitle: string;
  viewAllHref: string;
  itemHref: (id: string) => string;
  field: "content" | "description";
}

export const ContentSection = ({ table, limit, title, subtitle, viewAllHref, itemHref, field }: Props) => {
  const { t, lang, dir } = useLanguage();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from(table)
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(limit);
      setItems((data as Item[]) || []);
    })();
  }, [table, limit]);

  if (items.length === 0) return null;

  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const getImage = (it: Item) => it.featured_image || it.image || it.images?.[0] || null;
  const getDate = (it: Item) =>
    it.completion_date || it.published_at || it.created_at;

  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{title}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>
          </div>
          <Link to={viewAllHref} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            {t("home.viewAll")} <Arrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => {
            const img = getImage(it);
            return (
              <Link key={it.id} to={itemHref(it.id)}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                  {img ? (
                    <div className="aspect-video overflow-hidden bg-secondary">
                      <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5" />
                  )}
                  <div className="p-5">
                    {it.category && <Badge variant="outline" className="mb-2">{it.category}</Badge>}
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{pickLocalized(it as any, "title", lang)}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {pickLocalized(it as any, field, lang)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">{formatDate(getDate(it), lang)}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
