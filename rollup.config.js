import typescript from '@rollup/plugin-typescript';
import { generateDtsBundle } from 'rollup-plugin-dts-bundle-generator';

export default [
  {
    input: 'lib/core.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
      },
    ],
    plugins: [typescript(), generateDtsBundle()],
  },
];
