import * as THREE from 'three';
import { useCallback } from 'react';
import { useEngineCore } from '../Engine';


export function useTransitions() {
    const core = useEngineCore();
    const cameraService = core.getCameraService();
    const { activeRoom } = core;



    const viewNodes = useCallback(({ }) => {
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
