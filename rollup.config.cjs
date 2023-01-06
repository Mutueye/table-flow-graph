/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const scss = require('rollup-plugin-scss');
const pkg = require('./package.json');

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
    sourcemap: true,
  },
  {
    file: resolve('dist/index.min.js'),
    format: 'umd',
    name: 'TableFlowGraph',
    banner,
    min: true,
    sourcemap: false,
  },
  {
    file: pkg.main,
    format: 'cjs',
    banner,
    sourcemap: true,
  },
  {
    file: pkg.module,
    format: 'es',
    banner,
    sourcemap: true,
  },
];

module.exports = outputList.map((outputData) => {
  const output = {
    file: outputData.file,
    format: outputData.format,
    banner: outputData.banner,
    globals: {
      'lodash-es': 'lodashEs',
    },
    sourcemap: outputData.sourcemap,
  };
  if (outputData.name) output.name = outputData.name;

  return {
    external: ['lodash-es'],
    input: resolve('src/index.ts'),
    output,
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      scss({
        fileName: 'index.css',
        watch: glob.sync('src/**/*.@(sa|sc|c)ss'),
      }),
      outputData.min ? terser() : null,
    ],
  };
});
