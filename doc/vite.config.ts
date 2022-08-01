import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import * as path from 'path';

export default defineConfig({
  plugins: [react(), WindiCSS(), envCompatible()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  build: {
    commonjsOptions: {
      ignoreDynamicRequires: false,
    },
  },
  server: {
    open: true,
    host: '127.0.0.1',
    port: 8057,
    https: false,
    // proxy: {
    //   '/api/auth': {
    //     target: 'your proxy url',
    //     secure: false,
    //   },
    //   '/api/base': {
    //     target: 'your proxy url',
    //     secure: false,
    //   },
    // },
  },
});
