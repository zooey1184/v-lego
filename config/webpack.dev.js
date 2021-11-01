const { merge } = require('webpack-merge')
const common = require('./webpack.base.js')
const path = require('path')
// const open = require('opn') // 打开浏览器
const chalk = require('chalk') // 改变命令行中输出日志颜色插件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const axios = require('axios') ;

// axios.get('https://www-static.qbox.me/_next/data/T45SD_4A-MGZbKsJXsZOC/index.json').then(res => {
//   console.log('\n\n\n======json======\n',res.data, '====\n\n\n');
// })

console.log('==================');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  cache: {
    type: 'filesystem',
  },
  devServer: {
    // port: 8080,
    // contentBase: '../dist',
    host: '0.0.0.0',
    // overlay: true,
    // stats: 'errors-only',
    compress: true, // 为每个静态文件开启 gzip compression
    // after() {
    //   open(`http://localhost:${this.port}`)
    //     .then(() => {
    //       console.log(
    //         chalk.cyan(`成功打开链接： http://localhost:${this.port}`)
    //       )
    //     })
    //     .catch((err) => {
    //       console.log(chalk.red(err))
    //     })
    // },
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
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
  mode: 'development',
})
