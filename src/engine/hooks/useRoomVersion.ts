import { useEffect, useState } from 'react';
import { Room } from '../entities/Room';

/**
 * Hook que detecta cambios en un Room usando su versión interna
 * Cada vez que el room se modifica (scene, textures, skin), la versión se incrementa
 * y este hook fuerza un re-render de los componentes que dependen de él
 */
export function useRoomVersion(room: Room | null) {
    const [version, setVersion] = useState(0);

    useEffect(() => {
        if (!room) {
            setVersion(0);
            return;
        }

        // Actualizar la versión inicial
        const currentVersion = room.getVersion();
        setVersion(currentVersion);

        // Configurar un polling ligero para detectar cambios
        // En el futuro podríamos usar un EventEmitter, pero esto es más simple
        const interval = setInterval(() => {
            const newVersion = room.getVersion();
            if (newVersion !== version) {
                // console.log(`useRoomVersion: Room[${room.id}] versión cambió de ${version} a ${newVersion}`);
                setVersion(newVersion);
            }
        }, 16); // ~60fps para responsividad

        return () => clearInterval(interval);
    }, [room, version]);

    return version;
}