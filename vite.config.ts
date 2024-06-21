import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as child_process from 'node:child_process';
import { VitePluginRadar } from 'vite-plugin-radar';
import ogPlugin from 'vite-plugin-open-graph';

if (process.env.VITE_GIT_COMMIT_REF === undefined) {
  process.env.VITE_GIT_COMMIT_REF = child_process
    .execSync('git rev-parse --short HEAD')
    .toString();
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-C25VS7L111',
      },
    }),
    ogPlugin({
      basic: {
        title: 'Visual Sorting aka The Sound Of Sorting',
        type: 'website',
        image: '/visual-sorting/demo.png',
        description:
          '🔮 🔈 Visual Sorting (aka The Sound Of Sorting) is a tool that provides a visualization of sorting algorithms, accompanied by an auditory experience.',
        url: 'https://mszula.github.io/visual-sorting/',
        locale: 'en_US',
        video:
          'https://private-user-images.githubusercontent.com/17621834/293662995-3077ad21-ed6e-432c-ae51-5e9b96feb634.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTg5NTQ3NDcsIm5iZiI6MTcxODk1NDQ0NywicGF0aCI6Ii8xNzYyMTgzNC8yOTM2NjI5OTUtMzA3N2FkMjEtZWQ2ZS00MzJjLWFlNTEtNWU5Yjk2ZmViNjM0Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA2MjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNjIxVDA3MjA0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWFlNjI3ZWU1YTExZGIzYWE2NDJlMWY3ZTcyZTU3MzJhOTQwOGM5NmQzMjI0NTY0OTMzYjVmMTU1MTY0MGI2NGYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.PNoDhQp4joB_uUtdMjnN_NJZbxd74lv804l_qJG5daE',
      },
    }),
  ],
});
