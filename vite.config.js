import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// https://vitest.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: "VueToaster",
      fileName: "vue-toaster"
    },
    sourcemap: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        exports: "named",
        globals: {
          vue: 'Vue',
        },
      },
    }
  },
  test: {
    environment: "jsdom",
    clearMocks: true,
    typecheck: {
      checker: "vue-tsc"
    }
  }
});
