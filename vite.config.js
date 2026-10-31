import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Inside Docker on Windows, file-change events from the bind mount
    // never reach the container, so poll instead (set in docker-compose.yml).
    watch: process.env.VITE_USE_POLLING === 'true'
      ? { usePolling: true, interval: 300 }
      : undefined,
  },
})
