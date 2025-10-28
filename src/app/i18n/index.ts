
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/app/i18n/locales/en.json";
import es from "@/app/i18n/locales/es.json";

// Obtener idioma guardado de forma segura
const getSavedLanguage = () => {
    try {
        return typeof window !== 'undefined' ? localStorage.getItem("lang") : null;
    } catch {
        return null;
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
        },
        lng: getSavedLanguage() || "es",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

i18n.on("languageChanged", (lng) => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem("lang", lng);
        }
    } catch (error) {
        console.error("Error saving language:", error);
    }
});

export default i18n;
