import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import envCompatible from 'vite-plugin-env-compatible'

import { fileURLToPath } from 'url'

// Get __dirname equivalent for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), envCompatible()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
