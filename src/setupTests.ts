// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Configuración global para tests de Three.js
// Compatible con Node.js y navegador
const globalThis = typeof global !== 'undefined' ? global : window;

if (!globalThis.ResizeObserver) {
    globalThis.ResizeObserver = class ResizeObserver {
        observe() { }

        unobserve() { }

        disconnect() { }
    }
}

// Mock global para WebGL context
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => ({
        getExtension: () => null,
        getParameter: () => null,
        createProgram: () => null,
        createShader: () => null,
        shaderSource: () => null,
        compileShader: () => null,
        attachShader: () => null,
        linkProgram: () => null,
        useProgram: () => null,
        createBuffer: () => null,
        bindBuffer: () => null,
        bufferData: () => null,
        getAttribLocation: () => -1,
        enableVertexAttribArray: () => null,
        vertexAttribPointer: () => null,
        drawArrays: () => null,
        canvas: {},
    }),
});

// Re-export render utility
import { render as rend } from "@testing-library/react";
export { rend };