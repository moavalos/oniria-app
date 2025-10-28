/**
 * Servicio para gestionar la configuración del usuario
 * En el futuro se conectará a un endpoint del backend
 */

export interface UserSettings {
    roomId: string;
    skinId: string;
}

/**
 * Obtiene la configuración del usuario desde el backend
 * Por ahora está hardcodeado, en el futuro hará fetch a un endpoint
 */
export async function getUserSettings(): Promise<UserSettings> {
    // TODO: Reemplazar con llamada real al backend
    // const response = await fetch('/api/user/settings');
    // return await response.json();

    return {
        roomId: "oniria",
        skinId: "oniria",
    };
}

/**
 * Actualiza la configuración del usuario en el backend
 */
export async function updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    // TODO: Reemplazar con llamada real al backend
    // const response = await fetch('/api/user/settings', {
    //   method: 'PATCH',
    //   body: JSON.stringify(settings),
    // });
    // return await response.json();

    console.log('[UserSettings] Settings updated (mock):', settings);
    return getUserSettings();
}
