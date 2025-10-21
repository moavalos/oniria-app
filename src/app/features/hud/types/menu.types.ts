/**
 * Tipos de menús disponibles en la aplicación
 */
export type MenuType = "portal" | "settings" | "history" | null;

/**
 * Datos opcionales que puede recibir un menú
 */
export interface MenuData {
    [key: string]: any;
}

/**
 * Estado del menú activo
 */
export interface MenuState {
    activeMenu: MenuType;
    menuData?: MenuData;
}
