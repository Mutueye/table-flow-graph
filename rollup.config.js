/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

const banner = `/**
 * table-flow-graph v${pkg.version}
 * Copyright ${new Date().getFullYear()} Mutueye. Licensed under MIT
 */
`;

const resolve = (_path) => path.resolve(__dirname, _path);

const outputList = [
  {
    file: resolve('dist/index.js'),
    format: 'umd',
    name: 'TableFlowGraph',
    banner,
  },
  {
    file: resolve('dist/index.min.js'),
    format: 'umd',
    name: 'TableFlowGraph',
    banner,
    min: true,
  },
  {
    file: pkg.main,
    format: 'cjs',
    banner,
  },
  {
    file: pkg.module,
    format: 'es',
    banner,
  },
];

module.exports = outputList.map((outputData) => {
  const output = {
    file: outputData.file,
    format: outputData.format,
    banner: outputData.banner,
  };
  if (outputData.name) output.name = outputData.name;

  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      scss({
        output: resolve('dist/index.css'),
        watch: glob.sync('src/styles/**/*.@(sa|sc|c)ss'),
      }),
      outputData.min ? terser() : null,
    ],
  };
});
