import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en/translations.json";
import finTranslations from "./locales/fin/translations.json";

const resources = {
  en: { translations: enTranslations },
  fin: { translations: finTranslations },
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources,
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "fin"];

export default i18n;
