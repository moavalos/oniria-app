import type { IconName } from "@/assets/icons/iconsStore";

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

export interface MenuItem {
    label: string;
    description: string;
    action: () => void;
    icon?: IconName;
    disabled?: boolean;
}

export interface MenuObject {
    title: string;
    description: string;
    icon?: IconName;
    items: MenuItem[]
}

export interface MenuProps {
    data?: Record<string, any>;
    onClose: () => void;
    isClosing?: boolean;
}


export type MenuFactory = Record<string, MenuObject>