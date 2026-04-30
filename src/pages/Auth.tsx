import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import logo from "@/assets/logo-icon.png";

const Auth = () => {
  const { t, lang } = useLanguage();
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (searchParams.get("denied")) toast.error(t("auth.notAdmin"));
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error(t("auth.error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/30 flex items-center justify-center p-4" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Card className="w-full max-w-md p-8 shadow-xl">
        <Link to="/" className="flex flex-col items-center gap-3 mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
          <div className="flex items-center gap-2 text-primary">
            <Lock className="h-5 w-5" />
            <h1 className="text-2xl font-bold">{t("auth.title")}</h1>
          </div>
          <p className="text-sm text-muted-foreground text-center">{t("auth.subtitle")}</p>
        </Link>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : t("auth.signin")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
