import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';
import ignore from './rollup-plugins/ignore.mjs';
import esbuild from 'rollup-plugin-esbuild';
import { ignoreTextfieldFiles } from './elements/ignore/textfield.mjs';
import { ignoreSelectFiles } from './elements/ignore/select.mjs';
import { ignoreSwitchFiles } from './elements/ignore/switch.mjs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
// eslint-disable-next-line no-undef
const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({}),
  commonjs(),
  json(),
  esbuild({
    minify: !dev,
  }),
  dev && serve(serveopts),
  ignore({
    files: [...ignoreTextfieldFiles, ...ignoreSelectFiles, ...ignoreSwitchFiles].map((file) => require.resolve(file)),
  }),
];

export default [
  {
    input: 'src/boilerplate-card.ts',
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
