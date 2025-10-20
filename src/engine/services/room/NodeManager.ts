import * as THREE from "three";
import { EngineCore, Node, useEngineStore } from "@/engine/core";
import { MaterialService } from "../MaterialService";
import { AnimationService } from "../AnimationService";
import { CameraService } from "../CameraService";




// Eventos que emite el NodeManager
// interface NodeManagerEventMap {
//     'node:created': { newNode: Node };
//     // Definir eventos relacionados con la gestión de nodos aquí
// }

export class NodeManager {

    private store = useEngineStore.getState();

    private materialService: MaterialService | null = null;

    private cameraService: CameraService | null = null;

    private animationService: AnimationService | null = null;



    private currentNode: Node | null = null;

    private core: EngineCore;

    constructor(core: EngineCore) {
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
        this.cameraService?.removeEventListener('controlend', () => {
            this.onCameraControlEnd();
        });
        return this;
    }



    onCameraControlEnd() {
        console.log("[NodeManager] ⚠️ CameraControlEnd detectado");
        if (!this.cameraService || !this.currentNode) {
            console.log("[NodeManager] No hay cameraService o currentNode, ignorando controlend");
            return;
        }
        
        const target = this.core.getCurrentRoom()?.getPortal()?.position;
        if (!target) {
            console.log("[NodeManager] No hay portal target, ignorando controlend");
            return;
        }

        console.log("[NodeManager] 🎥 Moviendo cámara al portal por movimiento de cámara del usuario");
        this.cameraService.setLookAt(new THREE.Vector3(...target), new THREE.Vector3(target.x, target.y, target.z - 0.5), true);
    }

    createNode() {
        console.log("[NodeManager] 🏗️ createNode() ejecutándose...");
        // Lógica para crear un nodo
        const nodeGroup = this.createMeshForNode();

        const newNode = new Node("node")
        newNode.setGroup(nodeGroup);
        this.currentNode = newNode;
        console.log("[NodeManager] ✅ Nodo creado y asignado a this.currentNode:", !!this.currentNode);
        
        this.applyNodeMaterials(nodeGroup);
        console.log("[NodeManager] 📡 Emitiendo evento 'node:created'");
        this.core.emit('node:created', { newNode });

        return newNode;
    }

    getCurrentNode() {
        return this.currentNode;
    }

    /**
     * Ejecuta animación idle en el nodo activo
     */
    setNodeIdle() {
        this.executeNodeAnimation('nodeIdle');
    }

    /**
     * Ejecuta animación rest en el nodo activo  
     */
    setNodeRest() {
        this.executeNodeAnimation('nodeRest');
    }

    /**
     * Ejecuta animación next en el nodo activo
     */
    setNodeNext() {
        this.executeNodeAnimation('nodeNext');
    }

    /**
     * Ejecuta animación prev en el nodo activo
     */
    setNodePrev() {
        this.executeNodeAnimation('nodePrev');
    }

    /**
     * Ejecuta animación ping en el nodo activo - efecto visual de click
     */
    ping() {
        console.log("[NodeManager] 🎵 ping() llamado - ejecutando animación nodePing");
        this.executeNodeAnimation('nodePing');
    }

    /**
     * Método privado para ejecutar animaciones de nodo
     */
    private executeNodeAnimation(animationName: string) {
        if (!this.currentNode || !this.animationService) {
            console.warn(`[NodeManager] No hay nodo activo o AnimationService no disponible para ${animationName}`);
            return;
        }

        const group = this.currentNode.getGroup();
        if (!group) {
            console.warn(`[NodeManager] No se pudo obtener el grupo del nodo activo para ${animationName}`);
            return;
        }

        console.log(`[NodeManager] 🎭 Ejecutando animación ${animationName} en nodo con nombre: ${group.name}`);

        // Crear configuración de animación para AnimationService
        const animationConfig = {
            target: group.name || 'currentNode',
            type: animationName,
            params: {}, // Usar parámetros por defecto
            loop: false
        };

        // Usar AnimationService para ejecutar la animación por defecto
        this.animationService.play(animationConfig);

        console.log(`[NodeManager] Animación ${animationName} ejecutada`);
    }

    createMeshForNode() {
        // Lógica para crear un nodo
        const nodeGeometry = new THREE.PlaneGeometry(2, 2);
        const nodeMask = new THREE.PlaneGeometry(2, 2);

        //Agrupamos
        const nodeGroup = new THREE.Group();
        nodeGroup.name = "currentNode"; // Nombre para que AnimationService pueda encontrarlo
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

    /**
     * Destruye el nodo actual y limpia recursos
     */
    destroyNode() {
        if (this.currentNode) {
            console.log('[NodeManager] Destroying current node');

            // Obtener el grupo del nodo y limpiar recursos
            const nodeGroup = this.currentNode.getGroup();
            if (nodeGroup) {
                nodeGroup.traverse((child: THREE.Object3D) => {
                    if (child instanceof THREE.Mesh) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(material => material.dispose());
                            } else {
                                child.material.dispose();
                            }
                        }
                    }
                });
            }

            // Emitir evento de destrucción
            this.core.emit('node:destroyed', { node: this.currentNode });

            // Limpiar referencia
            this.currentNode = null;
        }
    }
}