import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig((env) => {
  const isDevMode = env.mode.includes('development');

  return {
    base: isDevMode ? '/' : '/4th-sbpb/',
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
    ],
    server: {
      host: 'localhost',
      port: 3000,
    },
    preview: {
      host: 'localhost',
      port: 4000,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
