const path = require('path');
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

import pkg from './package.json';

const version = pkg.version;
const banner = `/**
 * table-flow-graph v${version}
 * Copyright ${new Date().getFullYear()} Mutueye. Licensed under MIT
 */
`;

const resolve = (_path) => path.resolve(__dirname, _path);

const outputs = [
  {
    file: resolve('dist/table-flow-graph.js'),
    format: 'umd',
    name: 'TableFlowGraph',
    banner,
  },
  {
    file: resolve('dist/table-flow-graph.min.js'),
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

module.exports = outputs.map((output) => {
  return {
    input: resolve('src/table-flow-graph.ts'),
    output,
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      scss({ output: resolve('dist/table-flow-graph.css'), sourceMap: true }),
      output.min ? terser() : null,
    ],
  };
});
