/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react-swc';
import glsl from 'vite-plugin-glsl'
import path from 'path'

export default defineConfig({
    plugins: [react(), glsl()],
    test: {
        environment: "jsdom",   // DOM simulado
        globals: true,          // habilita describe, it, expect globales
        setupFiles: "./src/setupTests.ts", // opcional para mocks globales
    }, resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@pages": path.resolve(__dirname, "./src/app/pages"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@shared": path.resolve(__dirname, "./src/shared"),
            "@config": path.resolve(__dirname, "./src/config"),
            "@engine": path.resolve(__dirname, "./src/engine"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@utils": path.resolve(__dirname, "./src/shared/utils"),
            "@locales": path.resolve(__dirname, "./src/i18n/locales")
        }
    },
});
