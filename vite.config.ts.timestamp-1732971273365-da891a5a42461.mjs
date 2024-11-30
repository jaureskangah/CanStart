// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import viteCompression from "file:///home/project/node_modules/vite-plugin-compression/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz"
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br"
    })
  ],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "firebase-vendor": ["firebase/app", "firebase/auth", "firebase/firestore"],
          "ui-vendor": ["@headlessui/react", "lucide-react", "react-hot-toast"],
          "utils-vendor": ["axios", "date-fns", "clsx", "localforage"],
          "charts-vendor": ["chart.js", "react-chartjs-2"]
        }
      }
    },
    chunkSizeWarningLimit: 2e3,
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    reportCompressedSize: true
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "firebase/app",
      "firebase/auth",
      "firebase/firestore",
      "localforage",
      "chart.js",
      "react-chartjs-2"
    ],
    exclude: ["@firebase/auth", "@firebase/firestore"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdml0ZUNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxuICAgICAgZXh0OiAnLmd6J1xuICAgIH0pLFxuICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICBleHQ6ICcuYnInXG4gICAgfSlcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTE3MyxcbiAgICBob3N0OiB0cnVlXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICAnZmlyZWJhc2UtdmVuZG9yJzogWydmaXJlYmFzZS9hcHAnLCAnZmlyZWJhc2UvYXV0aCcsICdmaXJlYmFzZS9maXJlc3RvcmUnXSxcbiAgICAgICAgICAndWktdmVuZG9yJzogWydAaGVhZGxlc3N1aS9yZWFjdCcsICdsdWNpZGUtcmVhY3QnLCAncmVhY3QtaG90LXRvYXN0J10sXG4gICAgICAgICAgJ3V0aWxzLXZlbmRvcic6IFsnYXhpb3MnLCAnZGF0ZS1mbnMnLCAnY2xzeCcsICdsb2NhbGZvcmFnZSddLFxuICAgICAgICAgICdjaGFydHMtdmVuZG9yJzogWydjaGFydC5qcycsICdyZWFjdC1jaGFydGpzLTInXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICBjc3NNaW5pZnk6IHRydWUsXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWVcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1xuICAgICAgJ3JlYWN0JyxcbiAgICAgICdyZWFjdC1kb20nLFxuICAgICAgJ2ZpcmViYXNlL2FwcCcsXG4gICAgICAnZmlyZWJhc2UvYXV0aCcsXG4gICAgICAnZmlyZWJhc2UvZmlyZXN0b3JlJyxcbiAgICAgICdsb2NhbGZvcmFnZScsXG4gICAgICAnY2hhcnQuanMnLFxuICAgICAgJ3JlYWN0LWNoYXJ0anMtMidcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFsnQGZpcmViYXNlL2F1dGgnLCAnQGZpcmViYXNlL2ZpcmVzdG9yZSddXG4gIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLE9BQU8scUJBQXFCO0FBRTVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0QsZ0JBQWdCO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLGdCQUFnQixDQUFDLFNBQVMsV0FBVztBQUFBLFVBQ3JDLG1CQUFtQixDQUFDLGdCQUFnQixpQkFBaUIsb0JBQW9CO0FBQUEsVUFDekUsYUFBYSxDQUFDLHFCQUFxQixnQkFBZ0IsaUJBQWlCO0FBQUEsVUFDcEUsZ0JBQWdCLENBQUMsU0FBUyxZQUFZLFFBQVEsYUFBYTtBQUFBLFVBQzNELGlCQUFpQixDQUFDLFlBQVksaUJBQWlCO0FBQUEsUUFDakQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsSUFDdkIsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsc0JBQXNCO0FBQUEsRUFDeEI7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyxrQkFBa0IscUJBQXFCO0FBQUEsRUFDbkQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
