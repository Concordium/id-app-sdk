import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'IdAppSDK',
      fileName: 'idapp-sdk',
      formats: ['es', 'umd'],
    },
  },
  plugins: [dts({
    insertTypesEntry: true // adds `dist/index.d.ts`
  })],
});
