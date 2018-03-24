const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WATCH = !(process.env.WEBPACK_BUILD_DO_WATCH === 'false');
const extractSass = new ExtractTextPlugin('[name].css');

module.exports = [
  {
    entry:['babel-polyfill', 'classlist-polyfill', './src/js/init.js'],
    output:{
        filename:'./src/bundle/js/bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'stage-0']
            }
          }
        }
      ]
    },
    module: {
      rules:[
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          options:{
              presets:["env", "react"]
          }
        }
      ]
    },
    watch: WATCH,
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
    watch: WATCH,
    watchOptions: {
      ignored: /node_modules/
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        })
      }]
    },
    output: {
      filename: '[name].css',
      path: path.resolve(__dirname, './src/bundle/css')
    },
    plugins: [
      extractSass
    ]
  }
];
