import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en/translations.json";
import fiTranslations from "./locales/fi/translations.json";

const resources = {
  en: { translations: enTranslations },
  fi: { translations: fiTranslations },
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources,
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "fi"];

export default i18n;
