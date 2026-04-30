import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate, pickLocalized } from "@/lib/cms";

interface BlogPost {
  id: string;
  title_ar: string;
  title_en: string | null;
  content_ar: string;
  content_en: string | null;
  category: string | null;
  featured_image: string | null;
  slug: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

const empty = {
  id: "",
  title_ar: "",
  title_en: "",
  content_ar: "",
  content_en: "",
  category: "",
  featured_image: null as string | null,
  slug: "",
  published: false,
};

const AdminBlog = () => {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<typeof empty | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setItems((data as BlogPost[]) || []);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title_ar.trim() || !editing.content_ar.trim()) {
      toast.error(lang === "ar" ? "العنوان والمحتوى مطلوبان" : "Title and content are required");
      return;
    }
    setSaving(true);
    const payload = {
      title_ar: editing.title_ar.trim(),
      title_en: editing.title_en?.trim() || null,
      content_ar: editing.content_ar.trim(),
      content_en: editing.content_en?.trim() || null,
      category: editing.category?.trim() || null,
      featured_image: editing.featured_image,
      slug: editing.slug?.trim() || null,
      published: editing.published,
      published_at: editing.published ? new Date().toISOString() : null,
    };
    const { error } = editing.id
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("crud.success"));
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("crud.confirmDelete"))) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(t("crud.deleted"));
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-bold">{t("admin.blog")}</h1>
        <Button onClick={() => setEditing({ ...empty })}><Plus className="h-4 w-4" />{t("crud.new")}</Button>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">{t("crud.empty")}</Card>
      ) : (
        <div className="grid gap-4">
          {items.map((p) => (
            <Card key={p.id} className="p-4 flex gap-4 items-start">
              {p.featured_image && (
                <img src={p.featured_image} alt="" className="w-24 h-24 object-cover rounded-lg shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge variant={p.published ? "default" : "secondary"}>
                    {p.published ? t("crud.published") : t("crud.draft")}
                  </Badge>
                  {p.category && <Badge variant="outline">{p.category}</Badge>}
                </div>
                <h3 className="font-semibold truncate">{pickLocalized(p, "title", lang)}</h3>
                <p className="text-xs text-muted-foreground">{formatDate(p.created_at, lang)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="icon" variant="outline" onClick={() => setEditing({
                  id: p.id, title_ar: p.title_ar, title_en: p.title_en || "",
                  content_ar: p.content_ar, content_en: p.content_en || "",
                  category: p.category || "", featured_image: p.featured_image,
                  slug: p.slug || "", published: p.published,
                })}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? t("crud.edit") : t("crud.new")}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label>{t("crud.titleAr")} *</Label>
                  <Input value={editing.title_ar} onChange={(e) => setEditing({ ...editing, title_ar: e.target.value })} dir="rtl" />
                </div>
                <div>
                  <Label>{t("crud.titleEn")}</Label>
                  <Input value={editing.title_en} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>{t("crud.category")}</Label>
                <Input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
              </div>
              <div>
                <Label>{t("crud.image")}</Label>
                <ImageUpload value={editing.featured_image} onChange={(url) => setEditing({ ...editing, featured_image: url })} folder="blog" />
              </div>
              <div>
                <Label>{t("crud.contentAr")} *</Label>
                <Textarea rows={6} value={editing.content_ar} onChange={(e) => setEditing({ ...editing, content_ar: e.target.value })} dir="rtl" />
              </div>
              <div>
                <Label>{t("crud.contentEn")}</Label>
                <Textarea rows={6} value={editing.content_en} onChange={(e) => setEditing({ ...editing, content_en: e.target.value })} />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
                <Label>{editing.published ? t("crud.published") : t("crud.draft")}</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>{t("crud.cancel")}</Button>
            <Button onClick={handleSave} disabled={saving}>{t("crud.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
