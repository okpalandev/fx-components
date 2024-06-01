import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import  terser  from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/fx-components.ts',
    output: [
        {
            file: 'dist/fx-components.js',
            format: 'es',
            sourcemap: true
        },
        {
            file: 'dist/fx-components.umd.js',
            format: 'umd',
            name: 'FxComponents',
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
        postcss({
            extensions: ['.css', '.scss'],
            minimize: true,
            extract: 'dist/fx-components.css',
            use: [
                ['sass', {
                    includePaths: ['./src/styles']
                }]
            ]
        }),
        terser()
    ]
};
