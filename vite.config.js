import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()]
})

// If you are using TypeScript, there is also a declaration helper for better type inference:
/// <reference types="vite-plugin-svgr/client" />
