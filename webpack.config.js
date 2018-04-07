const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV || "production";
const IS_PRODUCTION = NODE_ENV === "production";

module.exports = {
    entry: ['./src/js/init.js', './src/scss/index.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist/js')
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /\/node_modules\//,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','stage-0','env','react']
                    }
                }
            },
            {
                test: /\.(png|jp(e*)g|svg|ttf|eot|woff|woff2)$/,
                exclude: /\/node_modules\//,
                use: [{
                    loader: 'url-loader',
                }]
            },
            {
                test: /\.scss$/,
                exclude: /\/node_modules\//,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize:  IS_PRODUCTION
                            }
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
            },
        ]
    },
    devtool: !IS_PRODUCTION ? 'source-map' : 'null',
    plugins: [
        new ExtractTextPlugin('../css/main.css'),
        new webpack.EnvironmentPlugin('NODE_ENV')
    ],
    watch: !IS_PRODUCTION,
}

if( IS_PRODUCTION ) {
    module.exports.plugins.push(
        new UglifyJsPlugin({
            uglifyOptions:{
                minimize: true
            }
        })
    )
}