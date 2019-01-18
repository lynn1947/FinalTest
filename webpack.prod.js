let webpack = require('webpack')
let merge = require('webpack-merge')
let path = require('path')
let htmlWebpackPlugin = require('html-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let configDll = require('./webpack.dev.dll')

const config = merge(configDll,{
    mode: 'development',
    entry: {
        bundle: ['babel-polyfill','./APP/index.js'],
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        
        new UglifyJsPlugin({
            uglifyOptions:{
                mangle: {
                    reserved: ['$super', '$', 'exports', 'require', 'module', '_']
                },
                compress: {
                    unused: true, //未使用的压缩
                    warnings: true
                },
                output: {
                    comments: false,
                }
            },
        })
    ],
    devtool: '#source-map',
    node:{
        fs: 'empty'
    }
})
  
module.exports = config