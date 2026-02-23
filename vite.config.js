import { defineConfig } from 'vite';

export default defineConfig({
    // Use relative base path so that GitHub Pages deployment works properly
    // regardless of the repository name
    base: './',
});
