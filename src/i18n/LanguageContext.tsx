import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { cmsTranslations } from "./cmsTranslations";

export type Lang = "ar" | "en";

type Dict = Record<string, string>;
type Translations = Record<Lang, Dict>;

const baseTranslations: Translations = {
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.products": "المنتجات",
    "nav.vision": "الرؤية",
    "nav.contact": "تواصل معنا",
    "nav.cta": "اطلب عرض سعر",

    "hero.eyebrow": "شركة القافلة — ليبيا",
    "hero.title": "رعاية بيطرية موثوقة وتغذية حيوانية متكاملة",
    "hero.subtitle":
      "نستورد أجود الأدوية البيطرية والمعدات الحديثة، مع تخصص في رعاية الخيول، لخدمة المربين والأطباء البيطريين في ليبيا.",
    "hero.cta1": "اكتشف منتجاتنا",
    "hero.cta2": "تواصل معنا",
    "hero.stat1": "سنوات من الخبرة",
    "hero.stat2": "منتج بيطري",
    "hero.stat3": "شريك دولي",

    "about.eyebrow": "من نحن",
    "about.title": "شركة القافلة لاستيراد الأدوية والمعدات البيطرية",
    "about.body":
      "تأسست شركة القافلة لتوفير حلول دوائية ومعدات بيطرية متكاملة في السوق الليبي، مع التزام راسخ بالجودة والشفافية. نتعاون مع موردين دوليين موثوقين لنضمن وصول منتجات آمنة وفعّالة لمربي الماشية والأطباء البيطريين، مع تخصص واضح في رعاية الخيول.",
    "about.point1.title": "جودة مضمونة",
    "about.point1.body": "منتجات مطابقة للمعايير الدولية ومرخصة.",
    "about.point2.title": "تخصص في الخيول",
    "about.point2.body": "خبرة عميقة في طب وتغذية الخيول.",
    "about.point3.title": "تغطية شاملة",
    "about.point3.body": "خدمة جميع المناطق الليبية بسرعة وكفاءة.",

    "products.eyebrow": "منتجاتنا",
    "products.title": "حلول دوائية وغذائية بيطرية",
    "products.subtitle":
      "مجموعة واسعة من المنتجات لدعم صحة الحيوان وإنتاجيته.",
    "products.cat1": "أحجار اللعق المعدنية",
    "products.cat1.desc": "مكملات معدنية أساسية للأبقار والأغنام والخيول.",
    "products.cat2": "مكملات ZOOMIX",
    "products.cat2.desc": "تركيبات متوازنة تحتوي على عسل ومغنيسيوم.",
    "products.cat3": "إضافات أعلاف ZOOTECH",
    "products.cat3.desc": "مكملات أعلاف عالية الأداء لصحة الحيوان.",
    "products.cat4": "أدوية بيطرية متخصصة",
    "products.cat4.desc": "فيتامينات، سيلينيوم، ومحفزات هضم.",

    "vision.eyebrow": "رؤيتنا ورسالتنا",
    "vision.visionTitle": "الرؤية",
    "vision.visionBody":
      "أن نكون الشركة الرائدة في الرعاية البيطرية وتغذية الحيوان في ليبيا والمنطقة.",
    "vision.missionTitle": "الرسالة",
    "vision.missionBody":
      "تقديم حلول دوائية ومعدات بيطرية شاملة تساهم في تحسين صحة الحيوان ورفع إنتاجيته.",
    "vision.valuesTitle": "قيمنا",
    "vision.values": "الجودة • النزاهة • الابتكار • خدمة المجتمع",

    "contact.eyebrow": "تواصل معنا",
    "contact.title": "نحن هنا لخدمتك",
    "contact.subtitle":
      "تواصل مع فريقنا لطلب عرض سعر أو لمعرفة المزيد عن منتجاتنا.",
    "contact.name": "الاسم الكامل",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.message": "رسالتك",
    "contact.send": "إرسال",
    "contact.address": "ليبيا",
    "contact.phoneLabel": "الهاتف",
    "contact.emailLabel": "البريد",

    "footer.tagline": "استيراد الأدوية والمعدات البيطرية في ليبيا",
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "تواصل",

    "zootech.eyebrow": "أحجار اللعق ZOOTECH",
    "zootech.title": "أحجار لعق معدنية متميزة",
    "zootech.subtitle":
      "أحجار لعق معدنية فاخرة لتحسين صحة الحيوان والإنتاجية والمناعة والنمو لدى المجترات والخيول.",
    "zootech.composition": "التركيب",
    "zootech.benefits": "الفوائد",
    "zootech.advantages": "المزايا",
    "zootech.usage": "الاستخدام",
    "zootech.usageBody":
      "يُترك للاستهلاك الطوعي من قِبَل الحيوان في مكان جاف يسهل الوصول إليه بالقرب من ماء الشرب.",
    "zootech.storage": "التخزين",
    "zootech.storageBody": "يُحفظ في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة.",
    "zootech.cta.contact": "تواصل معنا",
    "zootech.cta.order": "اطلب الآن",
    "zootech.contactTitle": "اطلب أو استفسر عن منتجاتنا",
    "zootech.contactSubtitle": "فريقنا جاهز لخدمتك ومساعدتك في اختيار المنتج المناسب.",
    "zootech.phone": "الهاتف",
    "zootech.email": "البريد الإلكتروني",

    "zootech.p1.name": "سيلينيوم بلس",
    "zootech.p1.tag": "حجر لعق أزرق",
    "zootech.p1.desc":
      "حجر لعق غني بالسيلينيوم وفيتامين E. علف تكميلي غير عضوي للمجترات والخيول.",
    "zootech.p1.benefits":
      "بفضل تركيبته الخاصة من السيلينيوم وفيتامين E، يساعد هذا المنتج على أداء وظائف بيولوجية مهمة في المجترات، ويقلل من المشكلات الناتجة عن نقص العناصر الغذائية مثل احتباس المشيمة، وأكسدة الحليب، وضعف المناعة، والتهاب الضرع، وضمور العضلات لدى الخيول.",
    "zootech.p1.adv1": "تحسين الإنجاب",
    "zootech.p1.adv2": "دعم صحة الجلد والصوف والشعر والحوافر",
    "zootech.p1.adv3": "تقوية العضلات والعظام",
    "zootech.p1.adv4": "زيادة الشهية",
    "zootech.p1.adv5": "تحسين إنتاجية الحيوان",

    "zootech.p2.name": "كالسيوم بلس",
    "zootech.p2.tag": "حجر لعق أحمر",
    "zootech.p2.desc":
      "حجر لعق غني بالكالسيوم والفوسفور. علف تكميلي غير عضوي للمجترات والخيول.",
    "zootech.p2.benefits":
      "مثالي للمجترات والخيول خلال فترة الحمل وللحيوانات الصغيرة. يقلل بشكل كبير من استهلاك المواد غير الغذائية كالتربة والقماش والأكياس البلاستيكية مع الاستخدام المنتظم.",
    "zootech.p2.adv1": "الوقاية من نقص الكالسيوم",
    "zootech.p2.adv2": "زيادة إنتاج الحليب",
    "zootech.p2.adv3": "تعزيز النمو الأمثل",
    "zootech.p2.adv4": "دعم الجهاز التناسلي",
    "zootech.p2.adv5": "تقوية الجهاز العضلي الهيكلي",
    "zootech.p2.adv6": "تعزيز المناعة وتحسين الهضم",

    "zootech.p3.name": "زنك بلس",
    "zootech.p3.tag": "حجر لعق أخضر",
    "zootech.p3.desc":
      "حجر لعق غني بالزنك. علف تكميلي غير عضوي للمجترات والخيول.",
    "zootech.p3.benefits":
      "الزنك عنصر غذائي أساسي يدعم أنظمة الإنزيمات وتخليق البروتين واستقلاب الكربوهيدرات. يقلل من استهلاك المواد غير الغذائية كالتربة والقماش والأكياس البلاستيكية.",
    "zootech.p3.adv1": "دعم النمو الأمثل",
    "zootech.p3.adv2": "دعم التكاثر الطبيعي",
    "zootech.p3.adv3": "صحة الجلد والصوف والشعر والحوافر",
    "zootech.p3.adv4": "تقوية العضلات والعظام",
    "zootech.p3.adv5": "تحسين وظائف المناعة",
    "zootech.p3.adv6": "زيادة الشهية والإنتاجية",

    "zootech.composition.item1": "كلوريد الصوديوم",
    "zootech.composition.item2": "كربونات الكالسيوم",
    "zootech.composition.item3": "فوسفات أحادي الكالسيوم",
    "zootech.composition.item4": "أكسيد المغنيسيوم",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.products": "Products",
    "nav.vision": "Vision",
    "nav.contact": "Contact",
    "nav.cta": "Request a quote",

    "hero.eyebrow": "Al-Qafila Company — Libya",
    "hero.title": "Trusted veterinary care & complete animal nutrition",
    "hero.subtitle":
      "We import premium veterinary medicines and modern equipment, with a focus on equine care, serving breeders and veterinarians across Libya.",
    "hero.cta1": "Explore products",
    "hero.cta2": "Contact us",
    "hero.stat1": "Years of expertise",
    "hero.stat2": "Veterinary products",
    "hero.stat3": "International partners",

    "about.eyebrow": "About us",
    "about.title": "Al-Qafila — Veterinary medicines & equipment imports",
    "about.body":
      "Al-Qafila was founded to deliver comprehensive pharmaceutical and veterinary equipment solutions to the Libyan market, with a firm commitment to quality and transparency. We partner with trusted international suppliers to bring safe, effective products to livestock breeders and veterinarians, with clear specialization in equine care.",
    "about.point1.title": "Guaranteed quality",
    "about.point1.body": "Products meeting international standards and certifications.",
    "about.point2.title": "Equine specialization",
    "about.point2.body": "Deep expertise in equine medicine and nutrition.",
    "about.point3.title": "Nationwide coverage",
    "about.point3.body": "Serving every Libyan region quickly and reliably.",

    "products.eyebrow": "Our products",
    "products.title": "Veterinary pharmaceutical & nutrition solutions",
    "products.subtitle":
      "A broad range of products to support animal health and productivity.",
    "products.cat1": "Mineral licking blocks",
    "products.cat1.desc": "Essential mineral supplements for cattle, sheep and horses.",
    "products.cat2": "ZOOMIX supplements",
    "products.cat2.desc": "Balanced formulations with honey and magnesium.",
    "products.cat3": "ZOOTECH feed additives",
    "products.cat3.desc": "High-performance feed supplements for animal health.",
    "products.cat4": "Specialized veterinary medicines",
    "products.cat4.desc": "Vitamins, selenium, and digestion boosters.",

    "vision.eyebrow": "Vision & mission",
    "vision.visionTitle": "Vision",
    "vision.visionBody":
      "To become the leading company in veterinary care and animal nutrition in Libya and the wider region.",
    "vision.missionTitle": "Mission",
    "vision.missionBody":
      "To deliver comprehensive pharmaceutical solutions and veterinary equipment that improve animal health and enhance productivity.",
    "vision.valuesTitle": "Our values",
    "vision.values": "Quality • Integrity • Innovation • Community service",

    "contact.eyebrow": "Contact",
    "contact.title": "We're here to help",
    "contact.subtitle":
      "Reach out to our team to request a quote or learn more about our products.",
    "contact.name": "Full name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.message": "Your message",
    "contact.send": "Send",
    "contact.address": "Libya",
    "contact.phoneLabel": "Phone",
    "contact.emailLabel": "Email",

    "footer.tagline": "Importing veterinary medicines and equipment in Libya",
    "footer.rights": "All rights reserved",
    "footer.quickLinks": "Quick links",
    "footer.contact": "Contact",

    "zootech.eyebrow": "ZOOTECH Licking Blocks",
    "zootech.title": "Premium mineral licking blocks",
    "zootech.subtitle":
      "Premium mineral licking blocks to improve animal health, productivity, immunity, and development in ruminants and horses.",
    "zootech.composition": "Composition",
    "zootech.benefits": "Benefits",
    "zootech.advantages": "Advantages",
    "zootech.usage": "Usage",
    "zootech.usageBody":
      "Should be left for voluntary consumption by the animal in a dry and easily accessible place near drinking water.",
    "zootech.storage": "Storage",
    "zootech.storageBody": "Store in a cool and dry place, away from direct sunlight.",
    "zootech.cta.contact": "Contact us",
    "zootech.cta.order": "Order now",
    "zootech.contactTitle": "Order or inquire about our products",
    "zootech.contactSubtitle": "Our team is ready to help you choose the right product.",
    "zootech.phone": "Phone",
    "zootech.email": "Email",

    "zootech.p1.name": "SELENIUM PLUS",
    "zootech.p1.tag": "Blue licking block",
    "zootech.p1.desc":
      "High Selenium & Vitamin E content licking block. Inorganic complementary feed for ruminants and horses.",
    "zootech.p1.benefits":
      "With its special Selenium and Vitamin E composition, this product helps perform important biological functions in ruminants. It helps reduce problems linked to nutrient deficiencies such as retained placentas, oxidized milk, lower immune function, mastitis, and muscular dystrophies in horses.",
    "zootech.p1.adv1": "Improves reproduction",
    "zootech.p1.adv2": "Healthy skin, wool, hair and hooves",
    "zootech.p1.adv3": "Strengthens muscles and bones",
    "zootech.p1.adv4": "Increases appetite",
    "zootech.p1.adv5": "Improves animal productivity",

    "zootech.p2.name": "CALCIUM PLUS",
    "zootech.p2.tag": "Red licking block",
    "zootech.p2.desc":
      "High calcium & phosphorus licking block. Inorganic complementary feed for ruminants and horses.",
    "zootech.p2.benefits":
      "Ideal for ruminants and horses during pregnancy and for young animals. With regular use, animals drastically reduce the consumption of non-feed substances such as soil, fabric, and plastic bags.",
    "zootech.p2.adv1": "Prevents hypocalcaemia",
    "zootech.p2.adv2": "Increases milk production",
    "zootech.p2.adv3": "Promotes optimal development",
    "zootech.p2.adv4": "Supports a healthy reproductive system",
    "zootech.p2.adv5": "Strengthens the musculoskeletal system",
    "zootech.p2.adv6": "Boosts immunity and digestion",

    "zootech.p3.name": "ZINC PLUS",
    "zootech.p3.tag": "Green licking block",
    "zootech.p3.desc":
      "High Zinc containing licking block. Inorganic complementary feed for ruminants and horses.",
    "zootech.p3.benefits":
      "Zinc is an essential nutrient that supports enzyme systems, protein synthesis, and carbohydrate metabolism. Reduces the consumption of non-feed substances such as soil, fabric, and plastic bags.",
    "zootech.p3.adv1": "Supports optimal growth",
    "zootech.p3.adv2": "Supports normal reproduction",
    "zootech.p3.adv3": "Healthy skin, wool, hair and hooves",
    "zootech.p3.adv4": "Strengthens muscles and bones",
    "zootech.p3.adv5": "Improves immune function",
    "zootech.p3.adv6": "Increases appetite and productivity",

    "zootech.composition.item1": "Sodium chloride",
    "zootech.composition.item2": "Calcium carbonate",
    "zootech.composition.item3": "Monocalcium phosphate",
    "zootech.composition.item4": "Magnesium oxide",
  },
};

const translations: Translations = {
  ar: { ...baseTranslations.ar, ...cmsTranslations.ar },
  en: { ...baseTranslations.en, ...cmsTranslations.en },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    return saved === "en" || saved === "ar" ? saved : "ar";
  });

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("lang", lang);
  }, [lang, dir]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
