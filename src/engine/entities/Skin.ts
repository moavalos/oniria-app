/**
 * Entidad que representa un skin (conjunto de texturas) para aplicar a una sala 3D.
 * Los skins permiten personalizar la apariencia visual de las salas cambiando
 * las texturas de objetos y ambiente de manera dinámica.
 */
export class Skin {
    private objectTextureUrl: string | null = null;

    private environmentTextureUrl: string | null = null;

    /**
     * Crea una nueva instancia de Skin con URLs de texturas basadas en el ID.
     * 
     * @param id - Identificador único del skin
     */
    constructor(public id: string) {
        this.objectTextureUrl = `skins/${id}_object.ktx2`;
        this.environmentTextureUrl = `skins/${id}_wall.ktx2`;
    }

    /**
     * Obtiene la URL de la textura para objetos de la sala.
     * 
     * @returns URL de la textura de objetos en formato KTX2
     */
    getObjectTextureUrl(): string | null {
        return this.objectTextureUrl;
    }

    /**
     * Obtiene la URL de la textura de ambiente/paredes de la sala.
     * 
     * @returns URL de la textura de ambiente en formato KTX2
     */
    getEnvironmentTextureUrl(): string | null {
        return this.environmentTextureUrl;
    }
}