import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression'; // Plugin para compresión gzip/brotli

export default defineConfig({
  plugins: [
    react(),
    compression(), // Habilita compresión para activos grandes como modelos 3D
  ],
  base: './', // Rutas relativas para despliegues no en raíz
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.mtl', '**/*.png', '**/*.woff', '**/*.woff2'], // Incluye tus formatos de activos
  build: {
    outDir: 'dist', // Carpeta de salida
    assetsDir: 'assets', // Carpeta de activos dentro de dist
    chunkSizeWarningLimit: 1000, // Aumentar el límite de tamaño de chunk para evitar advertencias
    assetsInlineLimit: 4096, // Archivos pequeños como imágenes se convierten en base64 solo si son mayores que este límite
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'], // Paquete separado para "three"
          vendor: ['react', 'react-dom', 'react-router-dom'], // Paquete separado para dependencias comunes
          // Puedes añadir más aquí si tienes otros paquetes grandes
        },
      },
    },
    // Configuración de esbuild para evitar el uso de eval (mejora de seguridad)
    esbuild: {
      inject: {
        'process.env.NODE_ENV': '"production"',
      },
    },
  },
});
