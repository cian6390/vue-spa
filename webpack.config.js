const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const rootResolve = file => path.resolve(__dirname, file)

const devServer = {
  contentBase: rootResolve('dist'),
  port: 9000
}

const tsRule = {
  test: /\.tsx?$/,
  use: {
    loader: 'ts-loader',
    options: { appendTsSuffixTo: [/\.vue$/] }
  },
  exclude: /node_modules/
}

const vueRule = {
  test: /\.vue$/,
  loader: 'vue-loader'
}

const styleRule = {
  test: /\.s[ac]ss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        data: `@import "@/_variables.scss";`
      }
    }
  ]
}

const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
  alias: {
    '@': rootResolve('src')
  }
}

const plugins = [
  new VueLoaderPlugin(),
  new CopyPlugin([
    {
      from: rootResolve('public/index.html'),
      to: rootResolve('dist/index.html')
    }
  ])
]

module.exports = {
  devServer,
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: rootResolve('dist')
  },
  resolve,
  module: {
    rules: [tsRule, vueRule, styleRule]
  },
  plugins
}
