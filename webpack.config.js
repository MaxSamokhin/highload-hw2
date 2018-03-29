const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./public/index.js",
    output: {
        path: path.resolve(__dirname, 'static/build'),
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/, // регулярка - какой файд к какому загрузчику
                loader: "babel", // загрузчик
                exclude: [/node_modules/, /static/] // какие папки не трогать
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /static/]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less",
                exclude: [/node_modules/, /static/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /static/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
};