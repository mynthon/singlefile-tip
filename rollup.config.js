import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/Tipka.js',
  output: [
    {
      file: 'build/mynthon.tipka.js',
      format: 'iife',
      name: 'net_mynthon',
      compact: true,
    },
    {
      file: 'build/mynthon.tipka.min.js',
      format: 'iife',
      name: 'net_mynthon',
      compact: true,
      plugins: [
        terser()
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