import { useLanguage } from "@/i18n/LanguageContext";
import logoEn from "@/assets/logo-en.png";
import logoAr from "@/assets/logo-ar.png";

const Footer = () => {
  const { t, lang } = useLanguage();
  const logo = lang === "ar" ? logoAr : logoEn;

  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="container py-16 grid md:grid-cols-3 gap-10">
        <div>
          <img src={logo} alt="Al-Qafila" className="h-28 w-auto brightness-0 invert" />
          <p className="mt-4 text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-4 space-y-2 text-primary-foreground/70">
            <li><a href="#about" className="hover:text-primary-foreground transition-smooth">{t("nav.about")}</a></li>
            <li><a href="#products" className="hover:text-primary-foreground transition-smooth">{t("nav.products")}</a></li>
            <li><a href="#vision" className="hover:text-primary-foreground transition-smooth">{t("nav.vision")}</a></li>
            <li><a href="#contact" className="hover:text-primary-foreground transition-smooth">{t("nav.contact")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
            {t("footer.contact")}
          </h4>
          <ul className="mt-4 space-y-2 text-primary-foreground/70 text-sm">
            <li>Tripoli, Libya</li>
            <li>+218 91 210 6988</li>
            <li>+218 91 355 7144</li>
            <li>info@al-qafila.ly</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Al-Qafila — {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
