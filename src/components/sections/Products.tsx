import { useLanguage } from "@/i18n/LanguageContext";
import lickingBox from "@/assets/licking-blocks-box-3d.jpeg";
import zoomixBuckets from "@/assets/product-zoomix-buckets.jpeg";
import feedBags from "@/assets/feed-supplement-bags.jpeg";
import zoomixRange from "@/assets/zoomix-range.jpeg";
import lickGreen from "@/assets/lick-block-green.jpeg";
import lickBlue from "@/assets/lick-block-blue.jpeg";
import lickRed from "@/assets/lick-block-red.jpeg";
import lickGrey from "@/assets/lick-block-grey.jpeg";

const Products = () => {
  const { t } = useLanguage();

  const cats = [
    { img: lickingBox, title: t("products.cat1"), desc: t("products.cat1.desc") },
    { img: zoomixBuckets, title: t("products.cat2"), desc: t("products.cat2.desc") },
    { img: feedBags, title: t("products.cat3"), desc: t("products.cat3.desc") },
    { img: zoomixRange, title: t("products.cat4"), desc: t("products.cat4.desc") },
  ];

  const lickColors = [lickGreen, lickBlue, lickRed, lickGrey];

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-accent">
            {t("products.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-primary-deep text-balance">
            {t("products.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("products.subtitle")}</p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cats.map((c) => (
            <article
              key={c.title}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth border border-border/60"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary-deep">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Licking blocks color variants */}
        <div className="mt-16 bg-gradient-soft rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-6">
            {lickColors.map((src, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth"
              >
                <img
                  src={src}
                  alt="Mineral licking block"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-smooth"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
