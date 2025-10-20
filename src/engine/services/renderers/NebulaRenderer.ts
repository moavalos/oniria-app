import * as THREE from "three";

/**
 * NebulaRenderer
 * Creates and animates a cylindrical nebula background.
 */
export class NebulaRenderer {
    private group: THREE.Object3D;

    private scene: THREE.Scene;

    private texture: THREE.Texture | null = null;

    private cylinder: THREE.Mesh | null = null;

    private light: THREE.PointLight | null = null;

    private ready = false;

    private ease = 12;

    private cycle = 0.0002;

    private move = new THREE.Vector3(0, 0, -40);

    private look = new THREE.Vector3(-1, 2, 3);

    private hyper: boolean = false;



    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.group = new THREE.Object3D();
        this.group.name = "NebulaRenderer_Group";
        this.group.position.set(this.move.x, this.move.y, this.move.z);
        this.group.rotation.set(this.look.x, this.look.y, this.look.z);
    }

    getHyperStatus(): boolean {
        return this.hyper;
    }

    /**
     * Initializes the nebula. Optionally provide a texture URL.
     */
    async init(texture: THREE.Texture) {

        if (!texture) {
            throw new Error("Texture is required to initialize NebulaRenderer");
        }

        this.texture = texture;
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;

        const material = new THREE.MeshLambertMaterial({
            color: 0xff0000,  // ROJO para debug - debería ser muy visible
            map: texture,  // Temporalmente sin textura
            blending: THREE.NormalBlending,
            side: THREE.DoubleSide,
            transparent: false,
            depthTest: false,
        });

        const geometry = new THREE.CylinderGeometry(150, 0, 500, 30, 30, true);
        this.cylinder = new THREE.Mesh(geometry, material);
        this.cylinder.rotation.x = Math.PI / 4;



        this.light = new THREE.PointLight(0xffffff, 1.5, 10000);
        this.light.position.set(0, 0, 1000);

        this.group.add(this.cylinder);
        this.group.add(this.light);

        // Cambiar color inicial
        this.changeColor();

        console.log('[NebulaRenderer]: Nebulosa inicializada', this.group);
    }

    setInitialPosition(position: THREE.Vector3) {
        // Posicionar la nebula más lejos en Z para que sea visible
        this.group.position.set(position.x, position.y, position.z - 50);
        console.log('[NebulaRenderer]: Posición ajustada:', this.group.position);
    }

    update() {
        if (!this.ready || !this.texture || !this.cylinder) return;

        this.look.z += this.cycle;
        this.texture.offset.y -= this.cycle;
        this.texture.needsUpdate = true;

        this.group.position.x += (this.move.x - this.group.position.x) / this.ease;
        this.group.position.y += (this.move.y - this.group.position.y) / this.ease;
        this.group.position.z += (this.move.z - this.group.position.z) / this.ease;
        this.group.rotation.x += (this.look.x - this.group.rotation.x) / this.ease;
        this.group.rotation.y += (this.look.y - this.group.rotation.y) / this.ease;
        this.group.rotation.z += (this.look.z - this.group.rotation.z) / this.ease;
    }



    /**
     * Randomly changes nebula light color.
     */
    private changeColor() {
        if (!this.light) return;
        const color = new THREE.Color();
        color.setHSL(Math.random(), 1, 0.5);
        this.light.color = color;
    }

    /**
     * Start hyperspace travel effect.
     */
    start() {


        if (!this.cylinder || !this.light) {
            console.error('[NebulaRenderer]: No se puede iniciar - falta cylinder o light');
            return;
        }

        this.scene.add(this.group);


        this.changeColor();
        this.ready = true;
        this.light.color = new THREE.Color(0xcceeff);
        this.cycle += 0.005;
        this.hyper = true;
        console.log(this.scene)
        console.log('[NebulaRenderer]: Nebula iniciada correctamente');
    }

    /**
     * Stop hyperspace travel effect.
     */
    stop() {
        this.changeColor();
        this.cycle -= 0.005;
        // this.move.z += 2000;
        this.scene.remove(this.group);
        this.hyper = false;
    }

    /**
     * Disposes all GPU resources.
     */
    dispose() {
        if (this.cylinder) {
            this.cylinder.geometry.dispose();
            const mat = this.cylinder.material as THREE.Material;
            mat.dispose();
        }

        if (this.texture) this.texture.dispose();

        if (this.scene && this.group) {
            this.scene.remove(this.group);
        }

        this.ready = false;
    }
}
