import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("✓");
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-soft">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
            {t("contact.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-primary-deep text-balance">
            {t("contact.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[
              { Icon: MapPin, label: t("contact.address"), value: "Tripoli, Libya" },
              { Icon: Phone, label: t("contact.phoneLabel"), value: "+218 ___ ___ ___" },
              { Icon: Mail, label: t("contact.emailLabel"), value: "info@al-qafila.ly" },
            ].map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 bg-card rounded-2xl p-6 shadow-card border border-border/60"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary text-primary-foreground shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                  <div className="mt-1 font-semibold text-primary-deep">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 bg-card rounded-2xl p-8 shadow-elegant border border-border/60 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Input required name="name" placeholder={t("contact.name")} />
              <Input required type="email" name="email" placeholder={t("contact.email")} />
            </div>
            <Input name="phone" placeholder={t("contact.phone")} />
            <Textarea required name="message" placeholder={t("contact.message")} rows={5} />
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full bg-primary hover:bg-primary-deep"
            >
              {t("contact.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
