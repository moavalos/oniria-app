import * as THREE from "three";
import { EngineCore } from "@engine/core/src/EngineCore";

/**
 * Configuración para los outlines
 */
export interface OutlineConfig {
    thickness?: number;
    color?: string | number | THREE.Color;
    opacity?: number;
    transparent?: boolean;
    screenspace?: boolean;
    toneMapped?: boolean;
    polygonOffset?: boolean;
    polygonOffsetFactor?: number;
    renderOrder?: number;
}

/**
 * Shader Material para outlines basado en drei
 */
class OutlineShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        const uniforms = {
            screenspace: { value: false },
            color: { value: new THREE.Color('black') },
            opacity: { value: 1 },
            thickness: { value: 0.05 },
            size: { value: new THREE.Vector2() },
        };

        super({
            side: THREE.BackSide,
            uniforms,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            vertexShader: `
                #include <common>
                #include <morphtarget_pars_vertex>
                #include <skinning_pars_vertex>
                #include <clipping_planes_pars_vertex>
                
                uniform float thickness;
                uniform bool screenspace;
                uniform vec2 size;
                
                void main() {
                    #if defined (USE_SKINNING)
                        #include <beginnormal_vertex>
                        #include <morphnormal_vertex>
                        #include <skinbase_vertex>
                        #include <skinnormal_vertex>
                        #include <defaultnormal_vertex>
                    #endif
                    
                    #include <begin_vertex>
                    #include <morphtarget_vertex>
                    #include <skinning_vertex>
                    #include <project_vertex>
                    #include <clipping_planes_vertex>
                    
                    vec4 tNormal = vec4(normal, 0.0);
                    vec4 tPosition = vec4(transformed, 1.0);
                    
                    #ifdef USE_INSTANCING
                        tNormal = instanceMatrix * tNormal;
                        tPosition = instanceMatrix * tPosition;
                    #endif
                    
                    if (screenspace) {
                        vec3 newPosition = tPosition.xyz + tNormal.xyz * thickness;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0); 
                    } else {
                        vec4 clipPosition = projectionMatrix * modelViewMatrix * tPosition;
                        vec4 clipNormal = projectionMatrix * modelViewMatrix * tNormal;
                        vec2 offset = normalize(clipNormal.xy) * thickness / size * clipPosition.w * 2.0;
                        clipPosition.xy += offset;
                        gl_Position = clipPosition;
                    }
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float opacity;
                #include <clipping_planes_pars_fragment>
                
                void main(){
                    #include <clipping_planes_fragment>
                    gl_FragColor = vec4(color, opacity);
                    #include <tonemapping_fragment>
                    #include <colorspace_fragment>
                }
            `
        });
    }
}

/**
 * Estados de outline para diferentes tipos de interacción
 */
export enum OutlineState {
    NONE = "none",
    HOVER = "hover",
    SELECTED = "selected",
    ACTIVE = "active"
}

/**
 * Información de outline para un objeto específico
 */
interface OutlineInfo {
    object: THREE.Object3D;
    state: OutlineState;
    config: OutlineConfig;
    material?: THREE.Material;
    originalMaterial?: THREE.Material;
}

/**
 * Gestor de efectos de outline para objetos 3D
 * 
 * Proporciona funcionalidad para aplicar efectos de outline a objetos Three.js
 * con diferentes estados (hover, selected, active) y configuraciones personalizables.
 */
export class OutlineManager {
    private core: EngineCore;

    private outlines: Map<string, OutlineInfo> = new Map();

    private defaultConfigs: Record<OutlineState, OutlineConfig> = {
        [OutlineState.NONE]: {},
        [OutlineState.HOVER]: {
            thickness: 0.03,
            color: "#00ff88",
            opacity: 0.8,
            transparent: true
        },
        [OutlineState.SELECTED]: {
            thickness: 0.05,
            color: "#ff6b00",
            opacity: 1.0,
            transparent: true
        },
        [OutlineState.ACTIVE]: {
            thickness: 0.07,
            color: "#ff0066",
            opacity: 1.0,
            transparent: true
        }
    };

    constructor(core: EngineCore) {
        this.core = core;
        console.log("[OutlineManager]: Inicializado");
    }

    /**
     * Configura los outlines por defecto para cada estado
     */
    setDefaultConfigs(configs: Partial<Record<OutlineState, OutlineConfig>>): void {
        Object.entries(configs).forEach(([state, config]) => {
            this.defaultConfigs[state as OutlineState] = {
                ...this.defaultConfigs[state as OutlineState],
                ...config
            };
        });
    }

    /**
     * Obtiene la configuración por defecto para un estado
     */
    getDefaultConfig(state: OutlineState): OutlineConfig {
        return { ...this.defaultConfigs[state] };
    }

    /**
     * Agrega outline a un objeto con un estado específico
     */
    addOutline(
        object: THREE.Object3D,
        state: OutlineState = OutlineState.HOVER,
        customConfig?: Partial<OutlineConfig>
    ): void {
        const objectId = object.uuid;

        // Remover outline existente si existe
        this.removeOutline(object);

        // Configuración final combinando defaults con personalización
        const config: OutlineConfig = {
            ...this.defaultConfigs[state],
            ...customConfig
        };

        // Crear el efecto de outline usando un enfoque simple con wireframe
        const outlineInfo = this.createOutlineEffect(object, config);
        if (outlineInfo) {
            outlineInfo.state = state;
            this.outlines.set(objectId, outlineInfo);
        }

        console.log(`[OutlineManager]: Outline ${state} agregado a objeto ${objectId}`);
    }

    /**
     * Remueve el outline de un objeto
     */
    removeOutline(object: THREE.Object3D): void {
        const objectId = object.uuid;
        const outlineInfo = this.outlines.get(objectId);

        if (outlineInfo) {
            this.removeOutlineEffect(outlineInfo);
            this.outlines.delete(objectId);
            console.log(`[OutlineManager]: Outline removido del objeto ${objectId}`);
        }
    }

    /**
     * Actualiza el estado de outline de un objeto
     */
    updateOutlineState(
        object: THREE.Object3D,
        newState: OutlineState,
        customConfig?: Partial<OutlineConfig>
    ): void {
        if (newState === OutlineState.NONE) {
            this.removeOutline(object);
            return;
        }

        this.addOutline(object, newState, customConfig);
    }

    /**
     * Obtiene el estado actual de outline de un objeto
     */
    getOutlineState(object: THREE.Object3D): OutlineState {
        const outlineInfo = this.outlines.get(object.uuid);
        return outlineInfo?.state || OutlineState.NONE;
    }

    /**
     * Verifica si un objeto tiene outline activo
     */
    hasOutline(object: THREE.Object3D): boolean {
        return this.outlines.has(object.uuid);
    }

    /**
     * Limpia todos los outlines activos
     */
    clearAllOutlines(): void {
        const objectIds = Array.from(this.outlines.keys());
        objectIds.forEach(objectId => {
            const outlineInfo = this.outlines.get(objectId);
            if (outlineInfo) {
                this.removeOutlineEffect(outlineInfo);
            }
        });
        this.outlines.clear();
        console.log("[OutlineManager]: Todos los outlines limpiados");
    }

    /**
     * Obtiene todos los objetos con outline activo
     */
    getOutlinedObjects(): THREE.Object3D[] {
        return Array.from(this.outlines.values()).map(info => info.object);
    }

    /**
     * Obtiene objetos por estado de outline
     */
    getObjectsByState(state: OutlineState): THREE.Object3D[] {
        return Array.from(this.outlines.values())
            .filter(info => info.state === state)
            .map(info => info.object);
    }

    /**
     * Crea el efecto visual de outline para un objeto usando shader material
     */
    private createOutlineEffect(object: THREE.Object3D, config: OutlineConfig): OutlineInfo | null {
        try {
            console.log("[OutlineManager]: Creando outline para objeto:", object.name || object.uuid, "config:", config);

            // Crear material shader de outline
            const outlineMaterial = new OutlineShaderMaterial();

            // Configurar el material con los parámetros usando uniforms directamente
            if (config.color) {
                if (config.color instanceof THREE.Color) {
                    outlineMaterial.uniforms.color.value.copy(config.color);
                } else {
                    outlineMaterial.uniforms.color.value.set(config.color);
                }
            }

            outlineMaterial.uniforms.opacity.value = config.opacity ?? 1.0;
            outlineMaterial.uniforms.thickness.value = config.thickness ?? 0.05;
            outlineMaterial.uniforms.screenspace.value = config.screenspace ?? false;
            outlineMaterial.transparent = config.transparent ?? true;

            // Obtener el tamaño del renderer para el shader
            const renderer = this.getRenderer();
            if (renderer) {
                const size = renderer.getDrawingBufferSize(new THREE.Vector2());
                outlineMaterial.uniforms.size.value.copy(size);
            } else {
                // Usar un tamaño por defecto si no se puede obtener el renderer
                outlineMaterial.uniforms.size.value.set(1920, 1080);
            }

            // Ajustes importantes para que el outline se vea como silueta (no relleno)
            // Renderizar solo la parte trasera y evitar que oculte la malla original.
            outlineMaterial.side = THREE.BackSide;
            outlineMaterial.depthTest = true;
            outlineMaterial.depthWrite = false;
            outlineMaterial.transparent = config.transparent ?? true;
            // Evitar z-fighting aplicando polygonOffset
            outlineMaterial.polygonOffset = true;
            outlineMaterial.polygonOffsetFactor = config.polygonOffsetFactor ?? 1;
            outlineMaterial.polygonOffsetUnits = config.polygonOffsetUnits ?? 1;

            // Guardar información del outline
            const outlineInfo: OutlineInfo = {
                object,
                state: OutlineState.NONE,
                config,
                material: outlineMaterial,
                originalMaterial: undefined
            };

            // Crear el grupo de outline
            const outlineGroup = new THREE.Group();
            outlineGroup.name = `${object.name || object.uuid}_outline_group`;

            // Aplicar el efecto a todas las mallas del objeto
            let meshCount = 0;
            object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    console.log("[OutlineManager]: Creando outline mesh para:", child.name || 'unnamed mesh');
                    this.createOutlineMeshForChild(child, outlineMaterial, outlineGroup);
                    meshCount++;
                }
            });

            console.log("[OutlineManager]: Se crearon", meshCount, "outline meshes en el grupo:", outlineGroup.name);

            // Agregar el grupo de outline como hijo del objeto original
            object.add(outlineGroup);

            return outlineInfo;

        } catch (error) {
            console.error("[OutlineManager]: Error creando outline:", error);
            return null;
        }
    }

    /**
     * Obtiene el renderer del core
     */
    private getRenderer(): THREE.WebGLRenderer | null {
        try {
            // Intentar obtener el renderer del core
            const scene = this.core.getScene();
            if (scene && (scene as any).renderer) {
                return (scene as any).renderer;
            }
            return null;
        } catch {
            return null;
        }
    }

    /**
     * Crea una malla de outline para un mesh hijo usando shader material
     */
    private createOutlineMeshForChild(
        originalMesh: THREE.Mesh,
        outlineMaterial: OutlineShaderMaterial,
        outlineGroup: THREE.Group
    ): void {
        let outlineMesh: THREE.Mesh;

        // Manejar diferentes tipos de mallas
        if (originalMesh instanceof THREE.SkinnedMesh && originalMesh.skeleton) {
            // Para SkinnedMesh
            outlineMesh = new THREE.SkinnedMesh(originalMesh.geometry, outlineMaterial);
            (outlineMesh as THREE.SkinnedMesh).bind(originalMesh.skeleton, originalMesh.bindMatrix);
        } else {
            // Para Mesh normal
            // Usar una instancia separada del material si queremos ajustar propiedades por malla en el futuro
            outlineMesh = new THREE.Mesh(originalMesh.geometry, outlineMaterial);
        }

        // Copiar propiedades importantes
        outlineMesh.name = `${originalMesh.name || 'mesh'}_outline`;
        outlineMesh.morphTargetInfluences = originalMesh.morphTargetInfluences;
        outlineMesh.morphTargetDictionary = originalMesh.morphTargetDictionary;

        // Configurar render order (outline debe renderizarse después del objeto original)
        outlineMesh.renderOrder = (originalMesh.renderOrder || 0) + 1;

        // Asegurar que la malla de outline tenga el mismo comportamiento de frustum culling
        outlineMesh.frustumCulled = originalMesh.frustumCulled;

        // Reforzar propiedades del material para evitar que el outline oculte la malla original
        if (outlineMesh.material) {
            outlineMesh.material.depthTest = true;
            // No escribimos en el depth buffer para que no "tape" otros objetos
            outlineMesh.material.depthWrite = false;
            // Asegurarse de que se estén usando las caras traseras (ya definido en el material principal)
            // Pero si por alguna razón el material fue clonado, dejamos side en BackSide
            try {
                (outlineMesh.material as THREE.Material).side = THREE.BackSide;
                (outlineMesh.material as any).polygonOffset = true;
                (outlineMesh.material as any).polygonOffsetFactor = outlineMaterial.polygonOffsetFactor ?? 1;
                (outlineMesh.material as any).polygonOffsetUnits = outlineMaterial.polygonOffsetUnits ?? 1;
            } catch (e) {
                // ignore
            }
        }

        // Copiar transformaciones
        outlineMesh.position.copy(originalMesh.position);
        outlineMesh.rotation.copy(originalMesh.rotation);
        outlineMesh.scale.copy(originalMesh.scale);

        // Agregar al grupo de outline
        outlineGroup.add(outlineMesh);
        console.log("[OutlineManager]: Outline mesh agregado:", outlineMesh.name, "al grupo:", outlineGroup.name);
    }

    /**
     * Remueve el efecto de outline de un objeto
     */
    private removeOutlineEffect(outlineInfo: OutlineInfo): void {
        const { object } = outlineInfo;

        // Buscar y remover el grupo de outline
        const outlineGroups = object.children.filter(
            child => child.name.endsWith('_outline_group')
        );

        outlineGroups.forEach(outlineGroup => {
            // Limpiar todos los meshes del grupo de outline
            outlineGroup.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    // No necesitamos disponer la geometría porque es compartida
                    // Solo disposer el material si es el shader material
                    if (child.material instanceof OutlineShaderMaterial) {
                        child.material.dispose();
                    }
                }
            });

            // Remover el grupo del objeto padre
            object.remove(outlineGroup);
        });
    }

    /**
     * Limpieza de recursos cuando se destruye el servicio
     */
    destroy(): void {
        this.clearAllOutlines();
        console.log("[OutlineManager]: Destruido");
    }
}