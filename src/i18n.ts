import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enFallacies from "./locales/en.json";
import arFallacies from "./locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    resources: {
      en: { fallacies: enFallacies },
      ar: { fallacies: arFallacies },
    },

    ns: ["fallacies"],
    defaultNS: "fallacies",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;