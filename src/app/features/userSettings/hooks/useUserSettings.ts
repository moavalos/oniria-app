import { useState, useEffect, useMemo } from "react";
import { getUserSettings, type UserSettings } from "../services/userSettingsService";
import { getTheme } from "@/app/features/dark-mode";

/**
 * Hook para gestionar la configuración del usuario y aplicar el tema
 * Combina las settings del usuario con el tema actual para determinar el skin correcto
 */
export function useUserSettings() {
    const [baseSettings, setBaseSettings] = useState<UserSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentTheme, setCurrentTheme] = useState(() => getTheme());

    // Cargar settings del usuario
    useEffect(() => {
        const loadSettings = async () => {
            try {
                setLoading(true);
                const userSettings = await getUserSettings();
                setBaseSettings(userSettings);
            } catch (error) {
                console.error("[useUserSettings] Error loading settings:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);

    // Observar cambios en el tema
    useEffect(() => {
        const handleThemeChange = () => {
            setCurrentTheme(getTheme());
        };

        // Observar cambios en la clase 'dark' del documento
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    handleThemeChange();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    // Calcular settings con el skin correcto según el tema
    const settings = useMemo(() => {
        if (!baseSettings) return null;

        const baseSkinId = baseSettings.skinId.replace("_dark", "");
        const skinId = currentTheme === "dark" ? `${baseSkinId}_dark` : baseSkinId;

        return {
            ...baseSettings,
            skinId,
        };
    }, [baseSettings, currentTheme]);

    return {
        settings,
        loading,
        roomId: settings?.roomId,
        skinId: settings?.skinId,
    };
}
