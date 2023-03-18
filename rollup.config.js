import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import WrapOutputLines from './rollup_plugin/rollup-plugin-wrap-output-lines.js';

export default {
  input: 'src/Tipka.js',
  output: [
    {
      file: 'build/mynthon.tipka.js',
      format: 'iife',
      name: 'net_mynthon_tipka',
      compact: true,
    },
    {
      file: 'build/mynthon.tipka.min.js',
      format: 'iife',
      name: 'net_mynthon_tipka',
      compact: true,
      plugins: [
        terser()
      ],
    },
    {
      file: 'build/mynthon.tipka.min.wrapped.js',
      format: 'iife',
      name: 'net_mynthon_tipka',
      compact: true,
      plugins: [
        terser(),
        WrapOutputLines()
      ],
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    }),
  ],
  watch: {
    include: 'src/*.js'
  }
};