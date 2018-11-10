const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


const mode = 'development';
const entry = ['./demo/src/js/demo.js', './demo/src/css/style.sass'];
const output = {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, "demo/dist"),
    publicPath: '/demo/'
};
const modules = {
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ["@babel/env"]
            }
        },
        {
            test: /\.(sass|scss)$/,
            use: [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                'css-loader', 'sass-loader',
            ]
        }
    ]
};
const devServer = {
    contentBase: './demo/'
};
const plugins = [
    new MiniCssExtractPlugin({
        filename: './css/style.css'
    })
];


module.exports = {
    mode: mode,
    entry: entry,
    output: output,
    module: modules,
    plugins: plugins,
    devServer: devServer
};