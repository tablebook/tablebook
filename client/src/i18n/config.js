import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./locales/en/translations.json";
import fiTranslations from "./locales/fi/translations.json";

const resources = {
  en: { translations: enTranslations },
  fi: { translations: fiTranslations },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["sessionStorage", "localStorage"],
      lookupLocalStorage: "EditorContext",
      lookupSessionStorage: "EditorContext",
    },
    resources,
    ns: ["translations"],
    defaultNS: "translations",
  });

i18n.languages = ["en", "fi"];

export default i18n;
