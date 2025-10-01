import * as THREE from 'three';
import { useCallback } from 'react';
import { useEngineAPI } from '../context/SceneProvider';


export function useTransitions() {
    const { cameraService, activeRoom } = useEngineAPI();



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
