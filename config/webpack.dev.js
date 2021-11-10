const { merge } = require('webpack-merge')
const common = require('./webpack.base.js')
const path = require('path')
const chalk = require('chalk') // 改变命令行中输出日志颜色插件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const axios = require('axios') ;


const PORT = 8089
module.exports = merge(common, {
  entry: {
    local: './src/index.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  cache: {
    type: 'filesystem',
  },
  devServer: {
    port: PORT,
    hot: true,
    host: '0.0.0.0',
    compress: true, // 为每个静态文件开启 gzip compression
    // open: true,
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|cur)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
  
})
