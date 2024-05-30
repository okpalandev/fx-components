import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import  terser  from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'es',
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        postcss({
            extensions: ['.css', '.scss'],
            minimize: true,
            extract: true
        }),
        terser()
    ]
};
