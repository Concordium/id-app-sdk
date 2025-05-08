import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'IdAppSDK',
      fileName: 'idapp-sdk',
      formats: ['es', 'umd'],
    },
  },
});
