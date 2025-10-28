/**
 * Servicio para gestionar el tema de la aplicación
 * Guarda y recupera la preferencia del tema en localStorage
 */

import type { EngineAPI } from '@engine/core/src/EngineAPI';

const THEME_STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark';

let engineAPI: EngineAPI | null = null;

/**
 * Inicializa el servicio de tema con la referencia al engine
 */
export function initThemeService(engine: EngineAPI): void {
    engineAPI = engine;

    // Leer el tema del localStorage y setearlo en el engine
    const currentTheme = getTheme();
    engineAPI.setTheme(currentTheme);
    applyTheme(currentTheme);

    console.log('[ThemeService]: Inicializado con tema', currentTheme);
}

/**
 * Obtiene el tema guardado en localStorage o el tema del sistema
 */
export function getTheme(): Theme {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (savedTheme) {
        return savedTheme;
    }

    // Si no hay tema guardado, usar la preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

/**
 * Guarda el tema en localStorage
 */
export function setTheme(theme: Theme): void {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    applyTheme(theme);

    // Actualizar el engine si está disponible
    if (engineAPI) {
        engineAPI.setTheme(theme);
    }
}

/**
 * Aplica el tema al documento
 */
export function applyTheme(theme: Theme): void {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/**
 * Alterna entre tema claro y oscuro
 */
export function toggleTheme(): Theme {
    const currentTheme = getTheme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    return newTheme;
}

/**
 * Inicializa el tema al cargar la aplicación
 */
export function initializeTheme(): void {
    const theme = getTheme();
    applyTheme(theme);
}
