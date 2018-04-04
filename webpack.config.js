const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('[name].css');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || "production";
const IS_PRODUCTION = NODE_ENV === "production";

module.exports = [
  {
    entry:['babel-polyfill', 'classlist-polyfill', './src/js/init.js'],
    output:{
        filename:'dist/js/bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: IS_PRODUCTION
      })
    ],
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['es2015','stage-0','env','react']
            }
          }
        }
      ]
    },
    watch: !IS_PRODUCTION,
    watchOptions: {
      ignored: /node_modules/
    },
    devtool: 'source-map',
  },
  {
    entry: path.resolve(__dirname, 'src/webpack/entrypoints/index.css.js'),
    resolve: {
      modules: ['node_modules']
    },
    devtool: 'source-map',
    watch: !IS_PRODUCTION,
    watchOptions: {
      ignored: /node_modules/
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [
              {loader: 'css-loader',
                options: {
                    sourceMap: !IS_PRODUCTION,
                    minimize:  IS_PRODUCTION
                }
              },
              {loader: 'sass-loader',
                options: {
                    sourceMap: !IS_PRODUCTION,
                    minimize:  IS_PRODUCTION
                }
              }
            ]
          })
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
                name: 'images/[hash]-[name].[ext]'
            }
          }]
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      ]
    },
    output: {
      filename: '[name].css',
      path: path.resolve(__dirname, 'dist/css')
    },
    plugins: [
        extractSass
    ]
  }
];