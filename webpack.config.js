const Uglify = require('uglifyjs-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')

module.exports = {
    entry: {lambda : './lambda.js'},
    target: 'node',
    output: {
        filename: 'index.js',
        path: __dirname,
        libraryTarget: 'umd'
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {presets: [['env',{targets: {node: '6.10'}}]], plugins: ['transform-runtime']}
        }]
    },
    plugins: [
        new Uglify(),
        new ZipPlugin({filename:'send_this_file_to_aws.zip'})
    ]
}
