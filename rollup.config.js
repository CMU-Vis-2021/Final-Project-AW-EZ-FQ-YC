// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [{
    input: 'main.js',
    output: {
        file: 'dist/js/main.bundle.js',
        format: 'iife'
    },
    watch: {
        include: ['*.js'],
        // include and exclude govern which files to watch. by
        // default, all dependencies will be watched
        exclude: ['node_modules/**']
    },
    plugins: [commonjs(), resolve()],
  },
  {
    input: 'main3.js',
    output: {
        file: 'dist/js/main3.bundle.js',
        format: 'iife'
    },
    watch: {
        include: ['*.js'],
        // include and exclude govern which files to watch. by
        // default, all dependencies will be watched
        exclude: ['node_modules/**']
    },
    plugins: [commonjs(), resolve()],
  },
{
    input: 'Anthony_chart.js',
    output: {
        file: 'dist/js/Anthony_chart.bundle.js',
        format: 'iife'
    },
    watch: {
        include: ['*.js'],
        // include and exclude govern which files to watch. by
        // default, all dependencies will be watched
        exclude: ['node_modules/**']
    },
    plugins: [commonjs(), resolve()],
  }, {
    input: 'anthony.js',
    output: {
        file: 'dist/js/anthony.bundle.js',
        format: 'iife'
    },
    watch: {
        include: ['*.js'],
        // include and exclude govern which files to watch. by
        // default, all dependencies will be watched
        exclude: ['node_modules/**']
    },
    plugins: [commonjs(), resolve()],
  }, {
    input: 'emily_chart.js',
    output: {
        file: 'dist/js/emily_chart.bundle.js',
        format: 'iife'
    },
    watch: {
        include: ['*.js'],
        // include and exclude govern which files to watch. by
        // default, all dependencies will be watched
        exclude: ['node_modules/**']
    },
    plugins: [commonjs(), resolve()],
  }, {
    input: 'fernie_chart.js',
    output: {
        file: 'dist/js/fernie_chart.bundle.js',
        format: 'iife'
    },
    watch: {
        include: ['*.js'],
        // include and exclude govern which files to watch. by
        // default, all dependencies will be watched
        exclude: ['node_modules/**']
    },
    plugins: [commonjs(), resolve()],
  }
];