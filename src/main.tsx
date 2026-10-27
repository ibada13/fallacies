import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import "./index.css";
import "./i18n";

import App from "./App";
import Fallacy from "./Fallacy/Fallacy";
import { NavBar } from "./Sections";

const SITE_URL = "https://YOUR-DOMAIN.com";

function SEO() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  const isArabic = i18n.language.startsWith("ar");
  const lang = isArabic ? "ar" : "en";
  const direction = isArabic ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
  }, [lang, direction]);

  const isHome = pathname === "/";
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).pop() ?? "");

  const title = isHome
    ? isArabic
      ? "المغالطات المنطقية: الأنواع والأمثلة والتعريفات"
      : "Logical Fallacies: Types, Examples & Definitions"
    : isArabic
      ? `${slug} | المغالطات المنطقية`
      : `${slug.replace(/[-_]/g, " ")} | Logical Fallacies`;

  const description = isHome
    ? isArabic
      ? "اكتشف المغالطات المنطقية من خلال تعريفات واضحة وأمثلة عملية. تعلم كشف الأخطاء في الاستدلال وتحسين التفكير النقدي."
      : "Explore logical fallacies with clear definitions and practical examples. Learn to identify flawed reasoning and improve your critical thinking."
    : isArabic
      ? `تعرف على ${slug}، واكتشف شرح المغالطة المنطقية وأمثلتها وكيفية التعرف عليها.`
      : `Learn about ${slug.replace(/[-_]/g, " ")}, with explanations and examples to help you recognize flawed reasoning.`;

  const canonicalUrl = `${SITE_URL}${pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {/* <link rel="canonical" href={canonicalUrl} /> */}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Logical Fallacies" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={isArabic ? "ar_AR" : "en_US"} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Root() {
  return (
    <>
      <SEO />
      <NavBar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:title" element={<Fallacy />} />
      </Routes>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/fallacies">
        <Root />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);