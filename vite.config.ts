import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'ui-vendor': ['@headlessui/react', 'lucide-react', 'react-hot-toast'],
          'utils-vendor': ['axios', 'date-fns', 'clsx', 'localforage'],
          'charts-vendor': ['chart.js', 'react-chartjs-2']
        }
      }
    },
    chunkSizeWarningLimit: 2000,
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'localforage',
      'chart.js',
      'react-chartjs-2'
    ],
    exclude: ['@firebase/auth', '@firebase/firestore']
  }
});