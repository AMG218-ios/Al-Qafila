import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, UserPlus, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/cms";

interface AdminUser { user_id: string; email: string | null; created_at: string }

const AdminUsers = () => {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.functions.invoke("manage-admins", { body: { action: "list" } });
    if (error) { toast.error(error.message); return; }
    setAdmins((data?.admins as AdminUser[]) || []);
  };

  useEffect(() => { load(); }, []);

  const grant = async () => {
    if (!email.trim()) return;
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("manage-admins", {
      body: { action: "grant", email: email.trim() },
    });
    setBusy(false);
    if (error || data?.error) {
      const msg = data?.error === "user_not_found" ? t("users.notFound") : (error?.message || data?.error);
      toast.error(msg);
      return;
    }
    toast.success(t("users.userAdded"));
    setEmail("");
    load();
  };

  const revoke = async (targetEmail: string | null) => {
    if (!targetEmail) return;
    if (!confirm(t("crud.confirmDelete"))) return;
    const { data, error } = await supabase.functions.invoke("manage-admins", {
      body: { action: "revoke", email: targetEmail },
    });
    if (error || data?.error) { toast.error(error?.message || data?.error); return; }
    toast.success(t("crud.deleted"));
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("users.title")}</h1>
      </div>

      <Card className="p-5">
        <Label>{t("users.email")}</Label>
        <div className="flex gap-2 mt-2">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
          <Button onClick={grant} disabled={busy || !email.trim()}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
            {t("users.makeAdmin")}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{t("users.notFound")}</p>
      </Card>

      <div className="grid gap-3">
        {admins.map((a) => (
          <Card key={a.user_id} className="p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium truncate">{a.email || a.user_id}</p>
              <p className="text-xs text-muted-foreground">{formatDate(a.created_at, lang)}</p>
            </div>
            {a.user_id !== user?.id && (
              <Button variant="outline" size="icon" onClick={() => revoke(a.email)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
