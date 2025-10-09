export class Skin {
    private objectTextureUrl: string | null = null;

    private environmentTextureUrl: string | null = null;

    constructor(public id: string
    ) {
        this.objectTextureUrl = `skins/${id}_object.ktx2`;
        this.environmentTextureUrl = `skins/${id}_wall.ktx2`;
    }

    getObjectTextureUrl() {
        return this.objectTextureUrl;
    }

    getEnvironmentTextureUrl() {
        return this.environmentTextureUrl;
    }

}