
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', 
    include: ["./src/utils/*.test.tsx"],
    setupFiles: "./src/utils/frontend.setup.tsx"
  },
 server: {
  cors: {
    origin: "http://localhost:3007/"
  }
 },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  }
 })
