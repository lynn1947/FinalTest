let webpack = require('webpack')
let path = require('path')

const vendor = [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router-dom',
    'react-router',
    'immutable',
    'moment',
    'yjs',
    'y-array',
    'y-memory',
    'y-richtext',
    'y-ipfs-connector',
    'quill',
    'ipfs',
    'ipfs-js',
    'ipfs-repo',
    'orbit-db',
    'orbit_',
]

const config = {
    entry: {
        vendor: vendor,
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
			path: path.join(__dirname, "dist", "[name]-manifest.json"),
			name: "[name]"
		})
    ],
    node:{
        fs: 'empty'
    }
}

module.exports = config