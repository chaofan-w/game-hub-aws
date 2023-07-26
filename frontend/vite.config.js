import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // adding proxy to the vite config, so as to connect to backend server
  server: {
    proxy: {
      "/api": {
        target: "https://game-hub-backend-35edbee07469.herokuapp.com",
        changeOrigin: true,
        // e.g., when receiving the request from frontend, /api/games, the proxy will rewrite the request to http://localhost:8000/api/games.
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
