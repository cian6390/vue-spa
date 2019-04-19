const fs = require('fs')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

require('dotenv').config()
const env = process.env
const isProd = process.env.NODE_ENV === 'production'
const mode = isProd ? 'production' : 'development'
const rootResolve = file => path.resolve(__dirname, file)

const devServer = {
  contentBase: rootResolve('dist'),
  port: 9000,
  https: {
    key: fs.readFileSync(env.HTTPS_KEY),
    cert: fs.readFileSync(env.HTTPS_CRT),
    ca: fs.readFileSync(env.HTTPS_ROOTCA)
  }
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
    },
    {
      from: rootResolve('public/service-worker.js'),
      to: rootResolve('dist/service-worker.js')
    }
  ])
]

module.exports = {
  mode,
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
