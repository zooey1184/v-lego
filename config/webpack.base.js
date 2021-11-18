
const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const dayjs = require('dayjs')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
// const I18nSpider = require('./I18nSpider')


// 依赖
const deps = require('../package.json').dependencies

const PORT = 8089
const TARGET = '$vlego'

module.exports = {
  // entry: ['./src/index.js'],
  
  target: 'web',
  module: {
    rules: [
      // 处理vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   compilerOptions: {
        //     compatConfig: {
        //       MODE: 3
        //     }
        //   }
        // }
      },
      // 处理字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      /* {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, '../tsconfig.json'),
              // 对应文件添加个.ts或.tsx后缀
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true, // 关闭类型检查，即只进行转译
            },
          },
        ],
      }, */
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: JSON.stringify(dayjs().format('YYYY/MM/DD HH:mm:ss')),
    }),
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // 处理静态文件夹 static 复制到打包的 static 文件夹
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: 'static',
        },
      ],
    }),
    // 指定环境,定义环境变量，项目中暂时未用到
    new webpack.DefinePlugin({
      // 'process.env': {
      //   VUE_BASE_URL: JSON.stringify('http://localhost:8080'),
      //   BUILD_TIME: JSON.stringify(dayjs().format('YYYY/DD/MM HH:mm:ss')),
      //   __VUE_PROD_DEVTOOLS__: 'false',
      // },
      // __VUE_OPTIONS_API__: false,
      // __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    }),
    // fork-ts-checker-webpack-plugin，顾名思义就是创建一个新进程，专门来运行Typescript类型检查。这么做的原因是为了利用多核资源来提升编译的速度
    new ForkTsCheckerWebpackPlugin(),
    // new ModuleFederationPlugin({
    //   name: 'vlego',
    //   filename: 'remoteEntry.js',
    //   exposes: { './Helo': './src/components/Helo.vue' },
    //   remotes: { '$vlego': `vlego@http://127.0.0.1:${PORT}/remoteEntry.js` },
    //   shared: {
    //     ...deps,
    //     vue: {
    //       eager: true,
    //     },
    //   },
    // }),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx'],
    alias: {
      '@': resolve('src'),
      // vue: '@vue/compat'
    },
  },
}
