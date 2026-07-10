// Kept separate from vite.config.ts: the app builds with rolldown-vite,
// whose plugin types conflict with the vite bundled inside vitest.
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
