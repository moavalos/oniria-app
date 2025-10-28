import MenuPortal from "./menu/portal/MenuPortal";
import MenuSetting from "./menu/setting/MenuSetting";

/**
 * Registro de menús disponibles
 * Mapea el nombre del menú al componente correspondiente
 */
export const menuRegistry = {
    portal: MenuPortal,
    monitor: MenuSetting,

    // Agrega más menús aquí...
} as const;

export type MenuName = keyof typeof menuRegistry;
