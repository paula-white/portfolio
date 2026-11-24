import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Case studies are built into /cs/, which the server only serves after the password is entered (see middleware.ts).
const CASE_STUDIES = ['Deputy', 'EdApp', 'ScTraining', 'DigitalResonance']

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: (chunk) => (CASE_STUDIES.includes(chunk.name) ? 'cs/[name]-[hash].js' : 'assets/[name]-[hash].js'),
      },
    },
  },
})
