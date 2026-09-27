import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const assetDirectory = new URL('./prototype/assets/', import.meta.url)

export default defineConfig({
  root: 'prototype',
  publicDir: false,
  build: { outDir: '../dist', emptyOutDir: true },
  plugins: [{
    name: 'package-character-assets',
    generateBundle() {
      for (const name of readdirSync(assetDirectory)) {
        if (!/_(E|N|S)\.png$/.test(name)) continue
        this.emitFile({ type: 'asset', fileName: `assets/${name}`, source: readFileSync(new URL(name, assetDirectory)) })
      }
    },
  }],
  server: { fs: { allow: [fileURLToPath(new URL('.', import.meta.url))] } },
})
