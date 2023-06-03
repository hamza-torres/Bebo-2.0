import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  compilerOptions: {
    baseUrl: "src",
  },
  include: ["src"],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000", // Replace with your API endpoint
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
