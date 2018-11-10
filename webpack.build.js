const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const mode = 'production';
const entry = './src/index.js';
const output = {
    filename: 'scrollAnimation.js',
    path: path.resolve(__dirname, 'build'),
    libraryExport: 'default',
    library: 'scrollAnimation'
};
const modules = {
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['@babel/env']
            }
        }
    ]
};
const target = 'node';
const optimization = {
    minimizer: [
        new UglifyJSPlugin({
            cache: true,
            parallel: true
        }),
    ]
};
const plugins = [];

module.exports = {
    mode: mode,
    target: target,
    entry: entry,
    output: output,
    module: modules,
    optimization: optimization,
    plugins: plugins
};