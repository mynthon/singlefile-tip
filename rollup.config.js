import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/tipka.js',
  output: {
    file: 'build/tipka.js',
    format: 'iife',
    name: 'myModule',
    compact: true
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    }),
    //terser()
  ],
  watch: {
    include: 'src/tipka.js'
  }
};