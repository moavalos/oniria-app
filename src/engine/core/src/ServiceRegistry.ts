type ServiceConstructor<T> = new (..._args: any[]) => T;

export class ServiceRegistry {
    private services = new Map<string, any>();

    // --- REGISTRO ---
    registerService<T>(ServiceClass: ServiceConstructor<T>, instance: T) {
        this.services.set(ServiceClass.name, instance);
        return instance;
    }

    // --- ACCESO ---
    getService<T>(ServiceClass: ServiceConstructor<T>): T {
        return this.services.get(ServiceClass.name) as T;
    }

    // --- LIMPIEZA ---
    dispose() {
        for (const s of this.services.values()) {
            (s as any).dispose?.();
        }
        this.services.clear();
    }
}
