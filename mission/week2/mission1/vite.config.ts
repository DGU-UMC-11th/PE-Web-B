import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // tanstackRouter는 react보다 앞에 둬야 한다
  plugins: [tanstackRouter({ autoCodeSplitting: true }), react(), tailwindcss()],
})
