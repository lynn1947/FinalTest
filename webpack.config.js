let path = require('path')
let webpack = require('webpack')

const config = {
    entry: {
        app:'./src/index.js'
    },
    outpust: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'bundle.js'
    },
    module: {
        rules:[{
            test:'/\.(js|jsx)$/',
            exclude: /node_modules/,
            use:[{
                loader: "babel-loader",
                options:{ presets: ['es2015','stage-0','react'] }
            }],
        },{
            test:'/\.css$/',
            exclude:/node_modules/,
            use: ["style-loader","css-loader",]
        },{
            test:'/\.less$/',
            exclude: /node_modules/,
            use: ["style-loader","css-loader","less-loader"]
        },{
            test:'/images/',
            exclude:/node_modules/,
            use: ["file-loader",]
        },{
            test:'/\.(png|jpg|svg)$/',
            exclude:/node_modules/,
            use: [{
                loader:"url-loader?limit=8192"
            }]
        },{
            test:'/icons/',
            exclude:/node_modules/,
            use: ["url-loader"]
        },],
    },
    devServer:{
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
}

module.exports = config