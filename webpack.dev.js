let webpack = require('webpack')
let path = require('path')
let htmlWebpackPlugin = require('html-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config ={
    mode: 'development',
    entry: {
        bundle: ['babel-polyfill','./src/index.js']
    },
    output: {
        path: path.join(__dirname,"dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        },{
            test: /\.css$/,
            use: ['style-loader','css-loader'],
          }, {
            test: /\.less$/,
            use:['style-loader','css-loader','less-loader'],
          },{
            test: /\.(png|gif|jpg|jpeg|woff|eot|ttf|svg)$/,
            exclude: /node_modules/,
            loader: 'file-loader?limit=30000&name=images/[name]-[hash].[ext]',
        }],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:'./dev/index.html',
            filename: './index.html'
        }),
        new UglifyJsPlugin({
            uglifyOptions:{
                mangle: {
                    reserved: ['$super', '$', 'exports', 'require', 'module', '_']
                },
                compress: {
                    unused: false,
                    warnings: true
                },
                output: {
                    comments: false,
                }
            },
        })
    ],
    devServer: {
        contentBase: path.join(__dirname,'dist'),
        compress: true,
        hot: true,
    },
    devtool: 'inline-source-map',
}

module.exports = config