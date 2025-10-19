import * as THREE from "three";
import { EngineCore, EventEmitter, Node, useEngineStore } from "@/engine/core";
import { MaterialService } from "../MaterialService";
import { AnimationService } from "../AnimationService";
import { CameraService } from "../CameraService";




// Eventos que emite el NodeManager
interface NodeManagerEventMap {
    'node:created': { newNode: Node };
    // Definir eventos relacionados con la gestión de nodos aquí
}

export class NodeManager extends EventEmitter<NodeManagerEventMap> {

    private store = useEngineStore.getState();

    private materialService: MaterialService | null = null;

    private cameraService: CameraService | null = null;

    private animationService: AnimationService | null = null;



    private currentNode: Node | null = null;

    private core: EngineCore;

    constructor(core: EngineCore) {
        super();
        this.core = core;
        this.init()
        this.configListeners()
    }

    init() {
        this.materialService = this.core.getService(MaterialService);
        this.cameraService = this.core.getService(CameraService);
        console.log(this.cameraService)
        this.animationService = this.core.getService(AnimationService);

    }

    configListeners() {
        // Configurar listeners DE CAMARA
        if (!this.cameraService) return;
        this.cameraService.addEventListener('controlend', () => {
            this.onCameraControlEnd();
        });

    }

    removeAllListeners(): this {
        super.removeAllListeners();
        return this;
    }



    onCameraControlEnd() {
        console.log("[NodeManager]:CamaraTerminada")
        if (!this.cameraService) return;
        const target = this.core.getCurrentRoom()?.getPortal()?.position;
        if (!target) return;
        this.cameraService.setLookAt(new THREE.Vector3(...target), new THREE.Vector3(target.x, target.y, target.z - 0.5), true);

    }

    createNode() {
        // Lógica para crear un nodo
        const nodeGroup = this.createMeshForNode();

        const newNode = new Node("node")
        newNode.setGroup(nodeGroup);
        this.currentNode = newNode;
        this.applyNodeMaterials(nodeGroup);
        this.emit('node:created', { newNode });

        return newNode;
    }

    getCurrentNode() {
        return this.currentNode;
    }

    createMeshForNode() {
        // Lógica para crear un nodo
        const nodeGeometry = new THREE.PlaneGeometry(2, 2);
        const nodeMask = new THREE.PlaneGeometry(2, 2);

        //Agrupamos
        const nodeGroup = new THREE.Group();
        const nodeMesh = new THREE.Mesh(nodeGeometry);
        const maskMesh = new THREE.Mesh(nodeMask);
        nodeMesh.name = "nodeMesh";
        maskMesh.name = "maskMesh";
        nodeGroup.add(nodeMesh);
        nodeGroup.add(maskMesh);
        return nodeGroup;
    }

    update(deltaTime: number) {
        // Actualiza los uniforms del material del nodo si existe
        if (this.currentNode) {
            this.currentNode.updateAnimation(deltaTime);
        }
    }

    applyNodeMaterials(nodeGroup: THREE.Group) {
        if (!this.materialService) return;
        this.materialService.applyMaterialsToNodes(nodeGroup, this.getUniformsForNode());
        this.currentNode?.setMaterial((nodeGroup.getObjectByName("nodeMesh") as THREE.Mesh).material as THREE.ShaderMaterial);
        // Lógica para aplicar materiales al nodo
    }

    dispose() {
        // Lógica para limpiar recursos del NodeManager
        this.removeAllListeners();
        this.currentNode = null;
    }

    getUniformsForNode() {
        return {
            uTime: { value: 0 },
            uResolution: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            // Uniforms sincronizados con el debug store (existentes)
            uPlasmaStrength: { value: this.store.nodeUniforms.uPlasmaStrength },
            uGlassStrength: { value: this.store.nodeUniforms.uGlassStrength },
            uPlasmaRadius: { value: this.store.nodeUniforms.uPlasmaRadius },
            uFresnelWidth: { value: this.store.nodeUniforms.uFresnelWidth },
            uFresnelIntensity: { value: this.store.nodeUniforms.uFresnelIntensity },
            uOnlyMask: { value: this.store.nodeUniforms.uOnlyMask },
            uFresnelBright: { value: this.store.nodeUniforms.uFresnelBright },
            uFresnelBrightWidth: { value: this.store.nodeUniforms.uFresnelBrightWidth },

            // Nuevos uniforms de dirección del humo/flujo
            uSmokeTurbulence: { value: this.store.nodeUniforms.uSmokeTurbulence },
            uSmokeDirectionOffset: { value: this.store.nodeUniforms.uSmokeDirectionOffset },

            // Nuevos uniforms de color del blob
            uPlasmaColor: { value: new THREE.Vector3(...this.store.nodeUniforms.uPlasmaColor) },
            uPlasmaColorIntensity: { value: this.store.nodeUniforms.uPlasmaColorIntensity },
            uPlasmaColorMap: {
                value: new THREE.Vector4(...this.store.nodeUniforms.uPlasmaColorMap),
            },
            // Paleta procedural del plasma (nuevos)
            uPlasmaOffset: {
                value: new THREE.Vector3(...this.store.nodeUniforms.uPlasmaOffset),
            },
            uPlasmaAmplitude: {
                value: new THREE.Vector3(...this.store.nodeUniforms.uPlasmaAmplitude),
            },
            uPlasmaFrequency: {
                value: new THREE.Vector3(...this.store.nodeUniforms.uPlasmaFrequency),
            },
            uPlasmaPhase: { value: new THREE.Vector3(...this.store.nodeUniforms.uPlasmaPhase) },

            uGlassColorBase: {
                value: new THREE.Vector3(...this.store.nodeUniforms.uGlassColorBase),
            },
            uGlassOffset: { value: new THREE.Vector3(...this.store.nodeUniforms.uGlassOffset) },
            uGlassAmplitude: {
                value: new THREE.Vector3(...this.store.nodeUniforms.uGlassAmplitude),
            },
            uGlassFrequency: {
                value: new THREE.Vector3(...this.store.nodeUniforms.uGlassFrequency),
            },
            uGlassPhase: { value: new THREE.Vector3(...this.store.nodeUniforms.uGlassPhase) },
            uGlassTint: { value: new THREE.Vector3(...this.store.nodeUniforms.uGlassTint) },
            uGammaCorrection: { value: this.store.nodeUniforms.uGammaCorrection },

            // Uniforms fijos para mask
            uMaskRadius: { value: 1.02 },
            uMaskEdgeSmooth: { value: 0.0 },
        };
    }
}