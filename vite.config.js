import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { assetFileNamer, chunkSplitter } from './conf';
import autoprefixer from 'autoprefixer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: '.',
  base: './',
  publicDir: 'public',

  define: {
    global: 'window',
  },

  server: {
    host: '127.0.0.1',
    open: 'http://127.0.0.1:5173',
    hmr: { host: '127.0.0.1' },
  },

  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        includePaths: ['src/sass'],
      },
    },
  },

  cacheDir: 'node_modules/.vite',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2024',
    esbuild: {
      legalComments: 'none',
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]/[hash].js',
        chunkFileNames: 'js/[name]/[hash].js',
        assetFileNames: ({ name }) => assetFileNamer({ name }),
        manualChunks: (id) => chunkSplitter(id),
      },
    },
    chunkSizeWarningLimit: 2000,
  },

  envDir: '.',
  envPrefix: 'VITE_',
});
