import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      events: 'events',
    },
  },
  plugins: [react()],

});

// https://vite.dev/config/
