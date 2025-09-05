import { defineConfig } from 'vite';
import path from 'path'
import dts from 'vite-plugin-dts';

export default defineConfig({
      plugins: [
    dts({
      entryRoot: 'src',      // folder sa tvojim .ts fajlovima
      outDir: 'dist',     // gde da se stave .d.ts fajlovi
      insertTypesEntry: true // kreira index.d.ts
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CPU8',
      fileName: 'index',
      formats: ['es'], 
    },
    rollupOptions: {
      external: [], 
    },
  },
});
