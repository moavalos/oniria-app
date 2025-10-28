/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react-swc';
import glsl from 'vite-plugin-glsl';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), glsl()],
  test: {
    environment: "jsdom",
    // DOM simulado
    globals: true,
    // habilita describe, it, expect globales
    setupFiles: "./src/setupTests.ts" // opcional para mocks globales
    ,

    projects: [{
      extends: true,
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  },
  resolve: {
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
  }
});