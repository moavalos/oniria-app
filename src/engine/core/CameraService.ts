import CameraControls from "camera-controls";
import type { CameraControlsEventMap } from "camera-controls/dist/types";
import * as THREE from "three";

export class CameraService {
    private static installed = false;
    private controls: CameraControls;

    constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
        if (!CameraService.installed) {
            CameraControls.install({ THREE });
            CameraService.installed = true;
        }
        this.controls = new CameraControls(camera, domElement);
    }

    update(delta: number) {
        this.controls.update(delta);
    }

    setLookAt(pos: THREE.Vector3, target: THREE.Vector3, smooth = true) {
        this.controls.setLookAt(
            pos.x,
            pos.y,
            pos.z,
            target.x,
            target.y,
            target.z,
            smooth
        );
    }

    reset(smooth = true) {
        this.controls.reset(smooth);
    }

    setMinMaxDistance(min: number, max: number) {
        this.controls.minDistance = min;
        this.controls.maxDistance = max;
    }

    moveTo(x: number, y: number, z: number, smooth = true) {
        this.controls.setPosition(x, y, z, smooth);
    }

    setSmoothTime(time: number) {
        this.controls.smoothTime = time;
    }

    setMaxPolarAngle(angle: number) {
        this.controls.maxPolarAngle = angle;
    }

    setMinPolarAngle(angle: number) {
        this.controls.minPolarAngle = angle;
    }

    setAximuthMaxAngle(angle: number) {
        this.controls.maxAzimuthAngle = angle;
    }

    setAzimuthMinAngle(angle: number) {
        this.controls.minAzimuthAngle = angle;
    }

    zoomTo(distance: number, smooth = true) {
        this.controls.zoomTo(distance, smooth);
    }

    setDraggingSmoothTime(time: number) {
        this.controls.draggingSmoothTime = time;
    }

    setBoundaryFriction(friction: number) {
        this.controls.boundaryFriction = friction;
    }

    setDampingFactor(factor: number) {
        this.controls.dampingFactor = factor;
    }

    setBoundaryEnclosesCamera(value: boolean) {
        this.controls.boundaryEnclosesCamera = value;
    }

    setEnablePan(value: boolean) {
        this.controls.mouseButtons.right = value ? CameraControls.ACTION.TRUCK : CameraControls.ACTION.NONE;
    }

    addEventListener(type: keyof CameraControlsEventMap, listener: (event: any) => void) {
        this.controls.addEventListener(type, listener);
    }

    removeEventListener(type: keyof CameraControlsEventMap, listener: (event: any) => void) {
        this.controls.removeEventListener(type, listener);
    }

    setRestThreshold(threshold: number) {
        this.controls.restThreshold = threshold;
    }




}
