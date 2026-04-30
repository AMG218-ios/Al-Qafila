import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Shield,
  Bone,
  TrendingUp,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  FlaskConical,
  Droplets,
  Sun,
} from "lucide-react";
import lickBlue from "@/assets/lick-block-blue.jpeg";
import lickRed from "@/assets/lick-block-red.jpeg";
import lickGreen from "@/assets/lick-block-green.jpeg";

type Theme = {
  // Tailwind classes per color
  ring: string;
  bg: string;
  bgSoft: string;
  text: string;
  textDeep: string;
  border: string;
  button: string;
  badge: string;
  glow: string;
};

const themes: Record<"blue" | "red" | "green", Theme> = {
  blue: {
    ring: "ring-blue-500/20",
    bg: "bg-blue-600",
    bgSoft: "bg-blue-50",
    text: "text-blue-600",
    textDeep: "text-blue-900",
    border: "border-blue-200",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    badge: "bg-blue-100 text-blue-700",
    glow: "from-blue-500/30 to-blue-700/0",
  },
  red: {
    ring: "ring-red-500/20",
    bg: "bg-red-600",
    bgSoft: "bg-red-50",
    text: "text-red-600",
    textDeep: "text-red-900",
    border: "border-red-200",
    button: "bg-red-600 hover:bg-red-700 text-white",
    badge: "bg-red-100 text-red-700",
    glow: "from-red-500/30 to-red-700/0",
  },
  green: {
    ring: "ring-emerald-500/20",
    bg: "bg-emerald-600",
    bgSoft: "bg-emerald-50",
    text: "text-emerald-600",
    textDeep: "text-emerald-900",
    border: "border-emerald-200",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    badge: "bg-emerald-100 text-emerald-700",
    glow: "from-emerald-500/30 to-emerald-700/0",
  },
};

const ZootechBlocks = () => {
  const { t } = useLanguage();

  const composition = [
    t("zootech.composition.item1"),
    t("zootech.composition.item2"),
    t("zootech.composition.item3"),
    t("zootech.composition.item4"),
  ];

  const products = [
    {
      key: "p1",
      color: "blue" as const,
      img: lickBlue,
      name: t("zootech.p1.name"),
      tag: t("zootech.p1.tag"),
      desc: t("zootech.p1.desc"),
      benefits: t("zootech.p1.benefits"),
      advantages: [
        { icon: Heart, label: t("zootech.p1.adv1") },
        { icon: Sparkles, label: t("zootech.p1.adv2") },
        { icon: Bone, label: t("zootech.p1.adv3") },
        { icon: TrendingUp, label: t("zootech.p1.adv4") },
        { icon: Shield, label: t("zootech.p1.adv5") },
      ],
    },
    {
      key: "p2",
      color: "red" as const,
      img: lickRed,
      name: t("zootech.p2.name"),
      tag: t("zootech.p2.tag"),
      desc: t("zootech.p2.desc"),
      benefits: t("zootech.p2.benefits"),
      advantages: [
        { icon: Shield, label: t("zootech.p2.adv1") },
        { icon: Droplets, label: t("zootech.p2.adv2") },
        { icon: TrendingUp, label: t("zootech.p2.adv3") },
        { icon: Heart, label: t("zootech.p2.adv4") },
        { icon: Bone, label: t("zootech.p2.adv5") },
        { icon: Sparkles, label: t("zootech.p2.adv6") },
      ],
    },
    {
      key: "p3",
      color: "green" as const,
      img: lickGreen,
      name: t("zootech.p3.name"),
      tag: t("zootech.p3.tag"),
      desc: t("zootech.p3.desc"),
      benefits: t("zootech.p3.benefits"),
      advantages: [
        { icon: TrendingUp, label: t("zootech.p3.adv1") },
        { icon: Heart, label: t("zootech.p3.adv2") },
        { icon: Sparkles, label: t("zootech.p3.adv3") },
        { icon: Bone, label: t("zootech.p3.adv4") },
        { icon: Shield, label: t("zootech.p3.adv5") },
        { icon: TrendingUp, label: t("zootech.p3.adv6") },
      ],
    },
  ];

  return (
    <section id="zootech" className="py-24 bg-gradient-soft">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
            {t("zootech.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-primary-deep text-balance">
            {t("zootech.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("zootech.subtitle")}</p>
        </div>

        {/* Product cards */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {products.map((p) => {
            const th = themes[p.color];
            return (
              <article
                key={p.key}
                className={`relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth border ${th.border} ring-1 ${th.ring} flex flex-col`}
              >
                {/* Image header */}
                <div className={`relative aspect-[4/3] ${th.bgSoft} overflow-hidden`}>
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${th.glow} pointer-events-none`}
                  />
                  <span
                    className={`absolute top-4 start-4 ${th.badge} text-xs font-semibold px-3 py-1 rounded-full`}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h3 className={`text-2xl font-bold ${th.textDeep}`}>{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

                  {/* Composition */}
                  <div className="mt-5">
                    <div
                      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${th.text}`}
                    >
                      <FlaskConical className="h-4 w-4" />
                      {t("zootech.composition")}
                    </div>
                    <ul className="mt-2 grid grid-cols-2 gap-1.5 text-sm text-foreground/80">
                      {composition.map((c) => (
                        <li key={c} className="flex items-start gap-1.5">
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${th.bg} shrink-0`} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mt-5">
                    <div
                      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${th.text}`}
                    >
                      <Heart className="h-4 w-4" />
                      {t("zootech.benefits")}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.benefits}
                    </p>
                  </div>

                  {/* Advantages */}
                  <div className="mt-5">
                    <div
                      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${th.text}`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {t("zootech.advantages")}
                    </div>
                    <ul className="mt-3 space-y-2">
                      {p.advantages.map(({ icon: Icon, label }) => (
                        <li key={label} className="flex items-start gap-2.5 text-sm">
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${th.bgSoft} ${th.text} shrink-0`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-foreground/85 leading-snug pt-1">{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Usage / Storage */}
                  <div className="mt-5 grid gap-3">
                    <div className={`rounded-xl ${th.bgSoft} p-3.5`}>
                      <div className={`flex items-center gap-2 text-xs font-bold ${th.textDeep}`}>
                        <Droplets className="h-3.5 w-3.5" />
                        {t("zootech.usage")}
                      </div>
                      <p className="mt-1 text-xs text-foreground/75 leading-relaxed">
                        {t("zootech.usageBody")}
                      </p>
                    </div>
                    <div className={`rounded-xl ${th.bgSoft} p-3.5`}>
                      <div className={`flex items-center gap-2 text-xs font-bold ${th.textDeep}`}>
                        <Sun className="h-3.5 w-3.5" />
                        {t("zootech.storage")}
                      </div>
                      <p className="mt-1 text-xs text-foreground/75 leading-relaxed">
                        {t("zootech.storageBody")}
                      </p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-2">
                    <Button asChild className={`flex-1 ${th.button}`}>
                      <a href="#zootech-contact">{t("zootech.cta.order")}</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className={`flex-1 ${th.border} ${th.text} hover:${th.bgSoft}`}
                    >
                      <a href="#zootech-contact">{t("zootech.cta.contact")}</a>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Contact block */}
        <div
          id="zootech-contact"
          className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground p-8 md:p-12 shadow-elegant"
        >
          <div className="absolute -top-24 -end-24 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />
          <div className="absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-balance">
                {t("zootech.contactTitle")}
              </h3>
              <p className="mt-3 text-primary-foreground/85 leading-relaxed">
                {t("zootech.contactSubtitle")}
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href="tel:+218912106988"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-4 transition-smooth border border-white/15"
                dir="ltr"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 shrink-0">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="text-start">
                  <div className="text-xs uppercase tracking-wider text-primary-foreground/70">
                    {t("zootech.phone")}
                  </div>
                  <div className="font-semibold">+218 91-2106988</div>
                </div>
              </a>
              <a
                href="tel:+218913557144"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-4 transition-smooth border border-white/15"
                dir="ltr"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 shrink-0">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="text-start">
                  <div className="text-xs uppercase tracking-wider text-primary-foreground/70">
                    {t("zootech.phone")}
                  </div>
                  <div className="font-semibold">0913557144</div>
                </div>
              </a>
              <a
                href="mailto:alqafila62@gmail.com"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-4 transition-smooth border border-white/15"
                dir="ltr"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 shrink-0">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="text-start">
                  <div className="text-xs uppercase tracking-wider text-primary-foreground/70">
                    {t("zootech.email")}
                  </div>
                  <div className="font-semibold">alqafila62@gmail.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZootechBlocks;
