import { useLanguage } from "@/i18n/LanguageContext";
import { ShieldCheck, Sparkles, MapPin } from "lucide-react";

const About = () => {
  const { t } = useLanguage();
  const points = [
    { Icon: ShieldCheck, title: t("about.point1.title"), body: t("about.point1.body") },
    { Icon: Sparkles, title: t("about.point2.title"), body: t("about.point2.body") },
    { Icon: MapPin, title: t("about.point3.title"), body: t("about.point3.body") },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-soft">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
            {t("about.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-primary-deep text-balance">
            {t("about.title")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("about.body")}
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {points.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-elegant transition-smooth border border-border/60"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-accent text-primary-foreground shadow-glow group-hover:scale-110 transition-smooth">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary-deep">{title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
