
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/app/i18n/locales/en.json";
import es from "@/app/i18n/locales/es.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
        },
        lng: localStorage.getItem("lang") || "es",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

i18n.on("languageChanged", (lng) => {
    localStorage.setItem("lang", lng);
});

export default i18n;
