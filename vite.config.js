import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/-Gradient-Frontier/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        archive: resolve(__dirname, 'archive.html'),
        about: resolve(__dirname, 'about.html')
      }
    }
  }
})
