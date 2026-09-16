import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { nitro } from 'nitro/vite';

export default defineConfig(({ mode, command }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [tailwindcss(), tsconfigPaths({ projects: ['./tsconfig.json'] }), tanstackStart({ server: { entry: 'server' } }), ...(command === 'build' ? [nitro({ preset: 'node-server', noExternals: true })] : []), react()],
    resolve: { dedupe: ['react', 'react-dom'] },
    server: { host: '0.0.0.0', port: 5173 },
  };
});
