import { useState, useEffect } from "react";
import { getUserSettings, type UserSettings } from "../services/userSettingsService";

/**
 * Hook para gestionar la configuración del usuario
 * Devuelve el skinId base (sin sufijo de tema) porque el engine se encarga de aplicar el tema
 */
export function useUserSettings() {
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [loading, setLoading] = useState(true);

    // Cargar settings del usuario
    useEffect(() => {
        const loadSettings = async () => {
            try {
                setLoading(true);
                const userSettings = await getUserSettings();

                // Asegurarse de que el skinId sea el base (sin sufijo _dark)
                const baseSkinId = userSettings.skinId.replace("_dark", "");
                const normalizedSettings = {
                    ...userSettings,
                    skinId: baseSkinId,
                };

                setSettings(normalizedSettings);
            } catch (error) {
                console.error("[useUserSettings] Error loading settings:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);

    return {
        settings,
        loading,
        roomId: settings?.roomId,
        skinId: settings?.skinId,
    };
}
