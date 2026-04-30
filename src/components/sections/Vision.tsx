import { useLanguage } from "@/i18n/LanguageContext";
import { Eye, Target, Heart } from "lucide-react";

const Vision = () => {
  const { t } = useLanguage();

  const items = [
    { Icon: Eye, title: t("vision.visionTitle"), body: t("vision.visionBody") },
    { Icon: Target, title: t("vision.missionTitle"), body: t("vision.missionBody") },
    { Icon: Heart, title: t("vision.valuesTitle"), body: t("vision.values") },
  ];

  return (
    <section id="vision" className="py-24 bg-primary-deep relative overflow-hidden">
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-foreground/90 border border-primary-foreground/20">
            {t("vision.eyebrow")}
          </span>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-primary-foreground/5 backdrop-blur rounded-2xl p-8 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-smooth"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary-glow text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-primary-foreground">{title}</h3>
              <p className="mt-3 text-primary-foreground/75 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
