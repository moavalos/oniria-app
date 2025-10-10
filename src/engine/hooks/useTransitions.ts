import * as THREE from 'three';
import { useCallback } from 'react';
import { useEngineCore } from '@engine/core';


export function useTransitions() {
    const services = useEngineCore();
    const cameraService = services.getCameraService();
    const { activeRoom } = services;



    const viewNodes = useCallback(() => {
        if (!cameraService || !activeRoom) return;
        const target = activeRoom.getPortal()?.position;
        if (!target) return;

        //event handler
        const onRest = () => {
            console.log('Camera at rest');
            cameraService.removeEventListener('rest', onRest);
        };


        cameraService.addEventListener('rest', onRest);

        cameraService.setRestThreshold(0.8);
        cameraService.setLookAt(
            new THREE.Vector3(target.x, target.y, target.z),
            new THREE.Vector3(target.x, target.y, target.z - 0.5),
            true
        );
    }, [cameraService, activeRoom]);


    return { viewNodes };
}
