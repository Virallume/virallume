import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import react from '@vitejs/plugin-react';

// Create separate configs for different parts of the extension
export default defineConfig(({ command, mode }) => {
  if (mode === 'background') {
    return {
      plugins: [
        {
          name: 'copy-manifest',
          generateBundle() {
            this.emitFile({
              type: 'asset',
              fileName: 'manifest.json',
              source: readFileSync('manifest.json', 'utf-8')
            });
          }
        }
      ],
      build: {
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
          entry: resolve(__dirname, 'src/background.ts'),
          name: 'background',
          formats: ['iife'],
          fileName: () => 'background.js'
        }
      }
    };
  }

  if (mode === 'content') {
    return {
      build: {
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
          entry: resolve(__dirname, 'src/content.ts'),
          name: 'content',
          formats: ['iife'],
          fileName: () => 'content.js'
        }
      }
    };
  }

  // Main popup build config
  return {
    plugins: [
      react(),
      {
        name: 'copy-static',
        generateBundle() {
          // Copy manifest
          this.emitFile({
            type: 'asset',
            fileName: 'manifest.json',
            source: readFileSync('manifest.json', 'utf-8')
          });
          // Copy popup.html
          this.emitFile({
            type: 'asset',
            fileName: 'popup.html',
            source: readFileSync('src/popup.html', 'utf-8')
          });
        }
      }
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, 'src/popup.ts'),
        name: 'popup',
        formats: ['iife'],
        fileName: () => 'popup.js'
      }
    }
  };
});
