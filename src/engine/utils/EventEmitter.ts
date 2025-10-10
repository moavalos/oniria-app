interface Name {
    original: string
    value: string
    namespace: string
}

// Tipo genérico para mapa de eventos
type EventMap = Record<string, unknown>;

// Tipo para callback función genérica - mejorado para compatibilidad con tipos específicos
type CallbackFunction<T = unknown> = (_data: T) => unknown;

/**
 * Sistema de eventos tipado para el motor 3D.
 * Permite comunicación desacoplada entre componentes mediante eventos.
 */
export class EventEmitter<T extends EventMap = EventMap> {
    callbacks: Record<string, Record<string, CallbackFunction[]>> = {}

    constructor() {
        this.callbacks = {}
        this.callbacks.base = {}
    }

    /**
     * Suscribe un callback a un evento específico.
     * @param _names - Nombre del evento o eventos
     * @param callback - Función a ejecutar cuando se dispare el evento
     */

    on<K extends keyof T>(_names: K | string, callback: CallbackFunction<T[K]>): this {
        // Errors
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('Nombre de evento incorrecto')
            return this
        }

        if (typeof callback === 'undefined') {
            console.warn('Callback incorrecto')
            return this
        }

        // Resolve names
        const names = this.resolveNames(_names as string)

        // Each name
        names.forEach((_name) => {
            // Resolve name
            const name = this.resolveName(_name)

            // Create namespace if not exist
            if (!(this.callbacks[name.namespace] instanceof Object)) this.callbacks[name.namespace] = {}

            // Create callback if not exist
            if (!(this.callbacks[name.namespace][name.value] instanceof Array))
                this.callbacks[name.namespace][name.value] = []

            // Add callback
            this.callbacks[name.namespace][name.value].push(callback as CallbackFunction)
        })

        return this
    }

    /**
     * Desuscribe callbacks de un evento específico.
     * @param _names - Nombre del evento a desuscribir
     */
    off(_names: string) {
        // Errors
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('Nombre incorrecto')
            return false
        }

        // Resolve names
        const names = this.resolveNames(_names)

        // Each name
        names.forEach((_name) => {
            // Resolve name
            const name = this.resolveName(_name)

            // Remove namespace
            if (name.namespace !== 'base' && name.value === '') {
                delete this.callbacks[name.namespace]
            }

            // Remove specific callback in namespace
            else {
                // Default
                if (name.namespace === 'base') {
                    // Try to remove from each namespace
                    for (const namespace in this.callbacks) {
                        if (
                            this.callbacks[namespace] instanceof Object &&
                            this.callbacks[namespace][name.value] instanceof Array
                        ) {
                            delete this.callbacks[namespace][name.value]

                            // Remove namespace if empty
                            if (Object.keys(this.callbacks[namespace]).length === 0) delete this.callbacks[namespace]
                        }
                    }
                }

                // Specified namespace
                else if (
                    this.callbacks[name.namespace] instanceof Object &&
                    this.callbacks[name.namespace][name.value] instanceof Array
                ) {
                    delete this.callbacks[name.namespace][name.value]

                    // Remove namespace if empty
                    if (Object.keys(this.callbacks[name.namespace]).length === 0) delete this.callbacks[name.namespace]
                }
            }
        })

        return this
    }

    /**
     * Dispara un evento específico con argumentos opcionales.
     * @param _name - Nombre del evento a disparar
     * @param _args - Argumentos a pasar a los callbacks
     */
    trigger(_name: string, _args?: unknown[]): unknown {
        // Errors
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('Nombre incorrecto')
            return false
        }

        let finalResult: unknown = null
        let result = null

        // Default args
        const args = !(_args instanceof Array) ? [] : _args

        // Resolve names (should on have one event)
        const nameArray = this.resolveNames(_name)

        // Resolve name
        const name = this.resolveName(nameArray[0])

        // Default namespace
        if (name.namespace === 'base') {
            // Try to find callback in each namespace
            for (const namespace in this.callbacks) {
                if (
                    this.callbacks[namespace] instanceof Object &&
                    this.callbacks[namespace][name.value] instanceof Array
                ) {
                    this.callbacks[namespace][name.value].forEach((callback: CallbackFunction) => {
                        result = callback(args[0])

                        if (typeof finalResult === 'undefined') {
                            finalResult = result
                        }
                    })
                }
            }
        }

        // Specified namespace
        else if (this.callbacks[name.namespace] instanceof Object) {
            if (name.value === '') {
                console.warn('Nombre incorrecto')
                return this
            }

            this.callbacks[name.namespace][name.value].forEach((callback: CallbackFunction) => {
                result = callback(args[0])

                if (typeof finalResult === 'undefined') finalResult = result
            })
        }

        return finalResult
    }

    /**
     * Método emit para compatibilidad con Node.js EventEmitter API.
     * @param eventName - Nombre del evento
     * @param data - Datos del evento
     */
    emit<K extends keyof T>(eventName: K, data: T[K]): boolean {
        return this.trigger(eventName as string, [data]) !== false;
    }

    /**
     * Método para remover todos los listeners.
     */
    removeAllListeners(): this {
        this.callbacks = {};
        this.callbacks.base = {};
        return this;
    }

    resolveNames(_names: string) {
        let names: string | string[] = _names
        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
        names = names.replace(/[,/]+/g, ' ')
        names = names.split(' ')

        return names
    }

    resolveName(name: string) {
        const newName: Partial<Name> = {}
        const parts = name.split('.')

        newName.original = name
        newName.value = parts[0]
        newName.namespace = 'base' // Base namespace

        // Specified namespace
        if (parts.length > 1 && parts[1] !== '') {
            newName.namespace = parts[1]
        }

        return newName as Name
    }
}