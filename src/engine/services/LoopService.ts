import { type RootState } from "@react-three/fiber";

type FrameCallback = (_state: RootState, _delta: number) => void;

/**
 * Servicio para gestión del loop de animación del motor.
 * Permite suscribirse a los frames de animación para actualizaciones periódicas.
 */
export class LoopService {
    private callbacks = new Set<FrameCallback>();

    /**
     * Suscribe un callback al loop de animación.
     * @param cb - Función a ejecutar en cada frame
     */
    subscribe(cb: FrameCallback) {
        this.callbacks.add(cb);
    }

    /**
     * Desuscribe un callback del loop de animación.
     * @param cb - Función a remover del loop
     */
    unsubscribe(cb: FrameCallback) {
        this.callbacks.delete(cb);
    }

    /**
     * Ejecuta todos los callbacks suscritos en el frame actual.
     * @param state - Estado del contexto de React Three Fiber
     * @param delta - Tiempo transcurrido desde el último frame
     */
    tick(state: RootState, delta: number) {
        this.callbacks.forEach(cb => cb(state, delta));
    }
}
