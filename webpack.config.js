const path = require('path');

module.exports = {
    entry: {
        ual: './dist/UAL.js',
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    "presets" : ["env"]
                }
            }
        ]
    },
    output: {
        filename: x => x.chunk.id.replace('_', '-') + '-debug.js',
        library: '[id]',
        path: path.resolve(__dirname, 'dist-web'),
    }
};
