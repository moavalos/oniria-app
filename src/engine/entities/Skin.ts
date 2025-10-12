/**
 * Entidad que representa un skin (conjunto de texturas) para aplicar a una sala
 */
export class Skin {
    private objectTextureUrl: string | null = null;

    private environmentTextureUrl: string | null = null;

    /**
     * Crea una nueva instancia de Skin
     * 
     * @param id - Identificador único del skin
     */
    constructor(public id: string) {
        this.objectTextureUrl = `skins/${id}_object.ktx2`;
        this.environmentTextureUrl = `skins/${id}_wall.ktx2`;
    }

    /**
     * Obtiene la URL de la textura para objetos
     * 
     * @returns URL de la textura de objetos
     */
    getObjectTextureUrl() {
        return this.objectTextureUrl;
    }

    /**
     * Obtiene la URL de la textura de ambiente/paredes
     * 
     * @returns URL de la textura de ambiente
     */
    getEnvironmentTextureUrl() {
        return this.environmentTextureUrl;
    }
}