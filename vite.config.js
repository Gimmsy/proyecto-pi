import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression'; // Plugin para compresión gzip/brotli

export default defineConfig({
  plugins: [
    react(),
    compression(), // Habilita compresión para activos grandes como modelos 3D
  ],
  base: './', // Rutas relativas para despliegues no en raíz
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.mtl', '**/*.png'], // Incluye tus formatos de activos
  build: {
    outDir: 'dist', // Carpeta de salida
    assetsDir: 'assets', // Carpeta de activos dentro de dist
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'], // Paquete separado para "three"
          vendor: ['react', 'react-dom'], // Paquete separado para dependencias comunes
        },
      },
    },
  },
});
