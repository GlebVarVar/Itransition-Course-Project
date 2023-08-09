import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from "autoprefixer";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  plugins: [react(), tsconfigPaths()],
});
