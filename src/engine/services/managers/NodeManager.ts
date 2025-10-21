import * as THREE from "three";

import { EngineCore, useEngineStore } from "@engine/core";
import { Node } from "@engine/entities/Node";
import { MaterialService } from "../MaterialService";
import { AnimationService } from "../AnimationService";
import { CameraService } from "../CameraService";

/**
 * Gestor para la creación, gestión y control de nodos de navegación 3D
 * 
 * Proporciona funcionalidad completa para manejar nodos interactivos en escenas 3D,
 * incluyendo creación de geometrías, aplicación de materiales, control de animaciones
 * y gestión del ciclo de vida. Integra servicios de cámara, materiales y animaciones
 * para proporcionar una experiencia de navegación fluida.
 */
export class NodeManager {

    private store = useEngineStore.getState();

    private materialService: MaterialService | null = null;

    private cameraService: CameraService | null = null;

    private animationService: AnimationService | null = null;



    private currentNode: Node | null = null;

    private core: EngineCore;

    /**
     * Crea una nueva instancia del gestor de nodos
     * 
     * @param core - Instancia del núcleo del motor para acceso a servicios
     */
    constructor(core: EngineCore) {
        this.core = core;
        this.init();
        this.configListeners();
    }

    /**
     * Inicializa los servicios necesarios del motor
     */
    init(): void {
        this.materialService = this.core.getService(MaterialService);
        this.cameraService = this.core.getService(CameraService);
        this.animationService = this.core.getService(AnimationService);
        console.log("[NodeManager]: Servicios inicializados");
    }

    /**
     * Configura los listeners de eventos de cámara
     */
    configListeners(): void {
        // Configurar listeners de cámara
        if (!this.cameraService) return;
        this.cameraService.addEventListener('controlend', () => {
            this.onCameraControlEnd();
        });
    }

    /**
     * Remueve todos los listeners de eventos configurados
     * 
     * @returns Esta instancia para encadenamiento
     */
    removeAllListeners(): this {
        this.cameraService?.removeEventListener('controlend', () => {
            this.onCameraControlEnd();
        });
        return this;
    }

    /**
     * Maneja el evento de finalización de control de cámara
     * 
     * Reposiciona la cámara hacia el portal cuando termina el control manual
     */
    onCameraControlEnd(): void {
        console.log("[NodeManager]: Control de cámara terminado");
        if (!this.cameraService || !this.currentNode) return;

        const target = this.core.getCurrentRoom()?.getPortal()?.position;
        if (!target) return;

        this.cameraService.setLookAt(
            new THREE.Vector3(...target),
            new THREE.Vector3(target.x, target.y, target.z - 0.5),
            true
        );
    }

    /**
     * Crea un nuevo nodo con geometría y materiales
     * 
     * @returns El nodo creado
     */
    createNode(): Node {
        // Crear geometría para el nodo
        const nodeGroup = this.createMeshForNode();

        const newNode = new Node("node");
        newNode.setGroup(nodeGroup);
        this.currentNode = newNode;
        this.applyNodeMaterials(nodeGroup);

        // Emitir solo información básica, no la instancia completa
        this.core.emit('node:created', {
            nodeId: newNode.id,
            hasGroup: newNode.hasGroup()
        });

        return newNode;
    }

    /**
     * Obtiene el nodo actualmente activo
     * 
     * @returns El nodo actual o null si no hay ninguno
     */
    getCurrentNode(): Node | null {
        return this.currentNode;
    }

    /**
     * Ejecuta animación idle en el nodo activo
     */
    setNodeIdle(): void {
        this.executeNodeAnimation('nodeIdle');
    }

    /**
     * Ejecuta animación rest en el nodo activo  
     */
    setNodeRest(): void {
        this.executeNodeAnimation('nodeRest');
    }

    /**
     * Ejecuta animación next en el nodo activo
     */
    setNodeNext(): void {
        this.executeNodeAnimation('nodeNext');
    }

    /**
     * Ejecuta animación prev en el nodo activo
     */
    setNodePrev(): void {
        this.executeNodeAnimation('nodePrev');
    }

    /**
     * Ejecuta animación ping en el nodo activo - efecto visual de click
     */
    ping(): void {
        this.executeNodeAnimation('nodePing');
    }

    /**
     * Método privado para ejecutar animaciones de nodo
     * 
     * @param animationName - Nombre de la animación a ejecutar
     */
    private executeNodeAnimation(animationName: string): void {
        if (!this.currentNode || !this.animationService) {
            console.warn(`[NodeManager]: No hay nodo activo o AnimationService no disponible para ${animationName}`);
            return;
        }

        const group = this.currentNode.getGroup();
        if (!group) {
            console.warn(`[NodeManager]: No se pudo obtener el grupo del nodo activo para ${animationName}`);
            return;
        }

        console.log(`[NodeManager]: Ejecutando animación ${animationName} en nodo: ${group.name}`);

        // Crear configuración de animación para AnimationService
        const animationConfig = {
            target: group.name || 'currentNode',
            type: animationName,
            params: {}, // Usar parámetros por defecto
            loop: false
        };

        // Usar AnimationService para ejecutar la animación
        this.animationService.play(animationConfig);
    }

    /**
     * Crea la geometría mesh para un nuevo nodo
     * 
     * @returns Grupo que contiene las geometrías del nodo
     */
    createMeshForNode(): THREE.Group {
        const nodeGeometry = new THREE.PlaneGeometry(2, 2);
        const nodeMask = new THREE.PlaneGeometry(2, 2);

        // Agrupar las geometrías
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



    /**
     * Actualiza el nodo en cada frame
     * 
     * @param deltaTime - Tiempo transcurrido desde el último frame
     */
    update(deltaTime: number): void {
        // Actualizar los uniforms del material del nodo si existe
        if (this.currentNode) {
            this.currentNode.updateAnimation(deltaTime);
        }
    }

    /**
     * Aplica materiales con shaders al grupo del nodo
     * 
     * @param nodeGroup - Grupo del nodo al que aplicar materiales
     */
    applyNodeMaterials(nodeGroup: THREE.Group): void {
        if (!this.materialService) return;

        this.materialService.applyMaterialsToNodes(nodeGroup, this.getUniformsForNode());
        this.currentNode?.setMaterial((nodeGroup.getObjectByName("nodeMesh") as THREE.Mesh).material as THREE.ShaderMaterial);
    }

    /**
     * Limpia recursos y remueve listeners
     */
    dispose(): void {
        this.removeAllListeners();
        this.currentNode = null;
    }

    /**
     * Obtiene los uniforms configurados para el material del nodo
     * 
     * @returns Objeto con todos los uniforms necesarios para el shader
     */
    getUniformsForNode(): Record<string, any> {
        return {
            uTime: { value: 0 },
            uResolution: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            // Uniforms sincronizados con el debug store
            uPlasmaStrength: { value: this.store.nodeUniforms.uPlasmaStrength },
            uGlassStrength: { value: this.store.nodeUniforms.uGlassStrength },
            uPlasmaRadius: { value: this.store.nodeUniforms.uPlasmaRadius },
            uFresnelWidth: { value: this.store.nodeUniforms.uFresnelWidth },
            uFresnelIntensity: { value: this.store.nodeUniforms.uFresnelIntensity },
            uOnlyMask: { value: this.store.nodeUniforms.uOnlyMask },
            uFresnelBright: { value: this.store.nodeUniforms.uFresnelBright },
            uFresnelBrightWidth: { value: this.store.nodeUniforms.uFresnelBrightWidth },

            // Uniforms de dirección del humo/flujo
            uSmokeTurbulence: { value: this.store.nodeUniforms.uSmokeTurbulence },
            uSmokeDirectionOffset: { value: this.store.nodeUniforms.uSmokeDirectionOffset },

            // Uniforms de color del blob
            uPlasmaColor: { value: new THREE.Vector3(...this.store.nodeUniforms.uPlasmaColor) },
            uPlasmaColorIntensity: { value: this.store.nodeUniforms.uPlasmaColorIntensity },
            uPlasmaColorMap: {
                value: new THREE.Vector4(...this.store.nodeUniforms.uPlasmaColorMap),
            },
            // Paleta procedural del plasma
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
    destroyNode(): void {
        if (this.currentNode) {
            console.log('[NodeManager]: Destruyendo nodo actual');

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