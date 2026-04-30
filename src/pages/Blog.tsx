import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { formatDate, pickLocalized } from "@/lib/cms";

const BlogList = () => {
  const { t, lang, dir } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts").select("*").eq("published", true)
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container">
          <header className="mb-10 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary">{t("blog.title")}</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{t("blog.subtitle")}</p>
          </header>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : posts.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">{t("blog.empty")}</Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <Link key={p.id} to={`/blog/${p.id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                    {p.featured_image ? (
                      <div className="aspect-video overflow-hidden bg-secondary">
                        <img src={p.featured_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5" />}
                    <div className="p-5">
                      {p.category && <Badge variant="outline" className="mb-2">{p.category}</Badge>}
                      <h2 className="font-bold text-lg mb-2 line-clamp-2">{pickLocalized(p, "title", lang)}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-3">{pickLocalized(p, "content", lang)}</p>
                      <p className="text-xs text-muted-foreground mt-3">{formatDate(p.published_at || p.created_at, lang)}</p>
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

export const BlogDetail = () => {
  const { id } = useParams();
  const { t, lang, dir } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const Arrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("id", id).eq("published", true).maybeSingle();
      setPost(data);
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline">
            <Arrow className="h-4 w-4" />{t("blog.back")}
          </Link>
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : !post ? (
            <Card className="p-12 text-center text-muted-foreground">{t("blog.notFound")}</Card>
          ) : (
            <article>
              {post.category && <Badge variant="outline" className="mb-3">{post.category}</Badge>}
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">{pickLocalized(post, "title", lang)}</h1>
              <p className="text-sm text-muted-foreground mb-6">{formatDate(post.published_at || post.created_at, lang)}</p>
              {post.featured_image && (
                <img src={post.featured_image} alt="" className="w-full rounded-xl mb-8 aspect-video object-cover" />
              )}
              <div className="prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed">
                {pickLocalized(post, "content", lang)}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
