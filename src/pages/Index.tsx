import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import ZootechBlocks from "@/components/sections/ZootechBlocks";
import Vision from "@/components/sections/Vision";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { ContentSection } from "@/components/sections/ContentSection";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <ZootechBlocks />
        <ContentSection
          table="projects"
          limit={3}
          title={t("home.projects.title")}
          subtitle={t("home.projects.subtitle")}
          viewAllHref="/projects"
          itemHref={(id) => `/projects/${id}`}
          field="description"
        />
        <ContentSection
          table="blog_posts"
          limit={3}
          title={t("home.blog.title")}
          subtitle={t("home.blog.subtitle")}
          viewAllHref="/blog"
          itemHref={(id) => `/blog/${id}`}
          field="content"
        />
        <ContentSection
          table="news_updates"
          limit={3}
          title={t("home.news.title")}
          subtitle={t("home.news.subtitle")}
          viewAllHref="/news"
          itemHref={() => "/news"}
          field="description"
        />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
