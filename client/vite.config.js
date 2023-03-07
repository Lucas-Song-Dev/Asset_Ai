import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000, // Bind to the port specified by Heroku, or use 3000 if not available
    host: '0.0.0.0', // Bind to any available IP address
  },
  build: {
    outDir: 'build', // Output directory for the built files
    emptyOutDir: true // Empty the output directory before building
  }
})
