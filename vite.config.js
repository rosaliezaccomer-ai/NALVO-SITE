const { defineConfig } = require('vite')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        mentions: './mentions-legales.html',
        politique: './politique-confidentialite.html',
      },
    },
  },
  server: {
    open: true,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
})
