let webpack = require('webpack')
let path = require('path')
let htmlWebpackPlugin = require('html-webpack-plugin')
let AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const config ={
    mode: 'development',
    entry: {
        bundle: ['babel-polyfill','./src/index.js'],
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
            filename: './index.html',
        }),
        new AddAssetHtmlPlugin({ 
            filepath: path.resolve(__dirname,'./dist/vendor.js'), 
            includeSourcemap: false 
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendor-manifest.json')
        })
    ],
    devServer: {
        compress: true,
        hot: true,
    },
    devtool: '#source-map',
    node:{
        fs: 'empty'
    }
}
  
module.exports = config