const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './v-selectable.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'selectable.js',
        library: 'vueSelectable',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};
