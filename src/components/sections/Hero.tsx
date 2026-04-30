import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/90 via-primary/80 to-primary/60" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-primary-foreground animate-fade-up">
          <span className="inline-block rounded-full bg-primary-foreground/10 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wider uppercase border border-primary-foreground/20">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-balance">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-xl leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow"
            >
              <a href="#products" className="inline-flex items-center gap-2">
                {t("hero.cta1")} <Arrow className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="#contact">{t("hero.cta2")}</a>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: "10+", l: t("hero.stat1") },
              { n: "50+", l: t("hero.stat2") },
              { n: "15+", l: t("hero.stat3") },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  {s.n}
                </div>
                <div className="text-xs text-primary-foreground/70 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:flex justify-center items-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-3xl rounded-full" />
          <div className="relative bg-primary-foreground/95 backdrop-blur rounded-3xl p-12 shadow-elegant animate-float">
            <img src={logoIcon} alt="Al-Qafila" className="h-64 w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
