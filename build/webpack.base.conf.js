'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const env = process.env;


const publicPath = process.env.NODE_ENV === 'production'
  ? env.PUBLIC_PATH ? env.PUBLIC_PATH : config.build.assetsPublicPath
  : config.dev.assetsPublicPath;

console.log('打包根目录', publicPath);

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js',
    oauth2: './src/oauth2.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new webpack.ProvidePlugin({
      Log: 'lmw-console-log'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        "static/config.js",
        "static/lib/url.min.js",
        "static/lib/md5-min.js",
        "static/lib/clipboard.min.js",
        "static/lib/sha512.min.js",
        "static/lib/socket.io.js",
        "static/css/weui.css",
        "static/lib/swiper/swiper-4.2.0.min.css",
        "static/lib/swiper/swiper-4.2.0.min.js",
      ],
      append: false
    })
  ]
}
