const path = require('path');

module.exports = {
    entry: {
        selectable: './v-selectable.js',
        selectable2: './v-selectable2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'vueSelectable',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};