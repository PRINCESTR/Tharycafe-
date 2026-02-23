import { defineConfig } from 'vite';

export default defineConfig({
    // Use relative base path so that GitHub Pages deployment works properly
    base: './',
    build: {
        outDir: 'docs', // Output to docs/ for easier GitHub Pages configuration
        emptyOutDir: true
    }
});
