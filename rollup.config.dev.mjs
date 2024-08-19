import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';
import esbuild from 'rollup-plugin-esbuild';
import ignore from './rollup-plugins/ignore.mjs';
import { ignoreTextfieldFiles } from './elements/ignore/textfield.mjs';
import { ignoreSelectFiles } from './elements/ignore/select.mjs';
import { ignoreSwitchFiles } from './elements/ignore/switch.mjs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export default {
  input: ['src/boilerplate-card.ts'],
  output: {
    dir: './dist',
    format: 'es',
  },
  external: ['lit/decorators', 'lit/directive'],
  plugins: [
    resolve(),
    json(),
    esbuild(),
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5001,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    ignore({
      files: [...ignoreTextfieldFiles, ...ignoreSelectFiles, ...ignoreSwitchFiles].map((file) => require.resolve(file)),
    }),
  ],
};
