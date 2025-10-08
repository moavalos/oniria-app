import { useEngineCore } from "../Engine";
import type { Node } from "../entities/Node";
import * as THREE from "three";

/**
 * Hook para trabajar con el nodo activo del engine
 */
export function useActiveNode() {
    const { activeNode } = useEngineCore();

    /**
     * Obtiene la entidad Node activa
     */
    const getNode = (): Node | null => {
        return activeNode;
    };

    /**
     * Obtiene el grupo Three.js del nodo activo
     */
    const getNodeGroup = (): THREE.Group<THREE.Object3DEventMap> | null => {
        return activeNode?.getGroup() || null;
    };

    /**
     * Busca un objeto por nombre en el nodo activo
     */
    const getObjectByName = (name: string): THREE.Object3D | null => {
        return activeNode?.getObjectByName(name) || null;
    };

    /**
     * Obtiene todos los objetos hijos del nodo activo
     */
    const getChildren = (): THREE.Object3D[] => {
        return activeNode?.getChildren() || [];
    };

    /**
     * Verifica si hay un nodo activo disponible
     */
    const hasActiveNode = (): boolean => {
        return activeNode !== null && activeNode.hasGroup();
    };

    /**
     * Obtiene la información de debug del nodo activo
     */
    const getDebugInfo = () => {
        return activeNode?.getDebugInfo() || null;
    };

    /**
     * Agrega un objeto al nodo activo
     */
    const addObject = (object: THREE.Object3D): void => {
        if (!activeNode) {
            throw new Error("No hay nodo activo disponible");
        }
        activeNode.addObject(object);
    };  /**
   * Remueve un objeto del nodo activo
   */
    const removeObject = (object: THREE.Object3D): void => {
        if (!activeNode) {
            throw new Error("No hay nodo activo disponible");
        }
        activeNode.removeObject(object);
    };  /**
   * Obtiene la posición del nodo activo
   */
    const getPosition = (): THREE.Vector3 | null => {
        return activeNode?.getPosition() || null;
    };

    /**
     * Obtiene la rotación del nodo activo
     */
    const getRotation = (): THREE.Euler | null => {
        return activeNode?.getRotation() || null;
    };

    /**
     * Obtiene la escala del nodo activo
     */
    const getScale = (): THREE.Vector3 | null => {
        return activeNode?.getScale() || null;
    };

    /**
     * Establece la visibilidad del nodo activo
     */
    const setVisible = (visible: boolean): void => {
        if (!activeNode) {
            console.warn("No hay nodo activo disponible para establecer visibilidad");
            return;
        }
        activeNode.setVisible(visible);
    };  /**
   * Obtiene la visibilidad del nodo activo
   */
    const isVisible = (): boolean => {
        return activeNode?.isVisible() || false;
    };

    return {
        // Entidad y grupo
        node: activeNode,
        getNode,
        getNodeGroup,
        hasActiveNode,

        // Manipulación de objetos
        getObjectByName,
        getChildren,
        addObject,
        removeObject,

        // Propiedades de transformación
        getPosition,
        getRotation,
        getScale,
        setVisible,
        isVisible,

        // Debug
        getDebugInfo,
    };
}