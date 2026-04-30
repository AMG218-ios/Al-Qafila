import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const { isAdmin } = useAuth();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeAnchor = (hash: string) => (isHome ? hash : `/${hash}`);

  const links = [
    { href: homeAnchor("#home"), label: t("nav.home"), internal: false },
    { href: homeAnchor("#about"), label: t("nav.about"), internal: false },
    { href: homeAnchor("#products"), label: t("nav.products"), internal: false },
    { href: "/projects", label: t("nav.projects"), internal: true },
    { href: "/blog", label: t("nav.blog"), internal: true },
    { href: "/news", label: t("nav.news"), internal: true },
    { href: homeAnchor("#contact"), label: t("nav.contact"), internal: false },
  ];

  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-smooth ${
        transparent ? "bg-transparent" : "bg-background/90 backdrop-blur-md shadow-card"
      }`}
    >
      <nav className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoIcon} alt="Al-Qafila logo" className="h-12 w-auto" />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-primary text-lg">
              {lang === "ar" ? "شركة القافلة" : "Al-Qafila"}
            </span>
            <span className="text-xs text-muted-foreground">
              {lang === "ar" ? "للأدوية والمعدات البيطرية" : "Veterinary Imports"}
            </span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) =>
            l.internal ? (
              <li key={l.href}>
                <Link to={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
                  {l.label}
                </Link>
              </li>
            ) : (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
                  {l.label}
                </a>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary transition-smooth"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          {isAdmin && (
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <Link to="/admin"><LayoutDashboard className="h-4 w-4" />{t("nav.admin")}</Link>
            </Button>
          )}
          <Button asChild className="hidden md:inline-flex bg-primary hover:bg-primary-deep">
            <a href={homeAnchor("#contact")}>{t("nav.cta")}</a>
          </Button>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <ul className="container flex flex-col py-4 gap-1">
            {links.map((l) => (
              <li key={l.href}>
                {l.internal ? (
                  <Link to={l.href} onClick={() => setOpen(false)} className="block py-2 text-base font-medium hover:text-primary">
                    {l.label}
                  </Link>
                ) : (
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-base font-medium hover:text-primary">
                    {l.label}
                  </a>
                )}
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link to="/admin" onClick={() => setOpen(false)} className="block py-2 text-base font-medium text-primary">
                  {t("nav.admin")}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
