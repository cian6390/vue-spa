
# Webpack and Sass

在我們開始本文內容之前，我們先將 webpack.config.js 做一點重構
這次的重構，我們僅僅是將一些 rule 分離出來，方便閱讀

```javascript
// webpack.config.js

const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const rootResolve = (file) => path.resolve(__dirname, file)

const devServer = {
  contentBase: rootResolve("dist"),
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
  test: /\.css$/,
  use: [
    'vue-style-loader',
    'css-loader'
  ]
}

const resolve = {
  extensions: [".tsx", ".ts", ".js"]
}

const plugins = [
  new VueLoaderPlugin(),
  new CopyPlugin([
    {
      from: rootResolve("public/index.html"),
      to: rootResolve("dist/index.html")
    }
  ])
]

module.exports = {
  devServer,
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: rootResolve("dist")
  },
  resolve,
  module: {
    rules: [
      tsRule,
      vueRule,
      styleRule
    ]
  },
  plugins
}

```

## 依賴
- sass-loader
- node-sass
- postcss
- postcss-loader
- autoprefixer

```shell
npm install --save-dev node-sass postcss autoprefixer sass-loader postcss-loader
touch ./.browserslistrc
touch ./postcss.config.js
```

這次我們除了安裝依賴套件之外，還新增了兩個設定檔 `.browserrc` 和 `postcss.config.js`  

## 設定

### .browserrc
browserrc 的設定很容易，將以下內容複製到剛剛建立的 `.browserrc` 之中  

```
> 0.5%
last 2 versions
Firefox ESR
not dead
```

### postcss.config.js
接著將以下內容複製到 `postcss.config.js`，來讓 postcss 幫我們自動加上瀏覽器供應商前綴。  

```javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

### webpack.config.js
最後是 webpack 的設定，我們刪除之前的 styleRule，將其更新為以下
```javascript
// webpack.config.js
// 一些其他設定 ...

// 這是原本的 styleRule, 刪除它！
// const styleRule = {
//   test: /\.css$/,
//   use: [
//     'vue-style-loader',
//     'css-loader'
//   ]
// }

// 建立新的 styleRule for sass/scss
const styleRule = {
  test: /\.s[ac]ss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader'
  ]
}
// 一些其他設定 ...
```

### src/App.vue

現在我們能夠更新 `src/App.vue` 的樣式區塊  
將其加上 `lang="scss"` 來讓 webpack 知道我們寫的是 `scss`

```typescript
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    msg: string = 'Hello Vuejs';
}
</script>

<template>
    <h4 v-text="msg" />
</template>

<style lang="scss" scoped>
h4 {
    color: blue;
    &:hover {
        color: red;
    }
}
</style>
```

完成之後關閉並重新執行 `npm run serve`，現在訪問 *http://localhost:9000*  
確定剛剛為 `h4` 加上的 `hover` 有生效。

### 全域變數

通常應用程式中會有一些全域變數，通常是一些網站的主色、次色、段落樣式之類的  
現在就來建立一個這樣子的變數文件 `src/_variables.scss`  

```shell
touch ./src/_variables.scss
```

然後把以下內容複製進 `src/_variables.scss`
```scss
$primary: blue;
$success: green
```

接著我們需要讓 webpack 在編譯到 `scss` 文件時自動幫我們把變數注入  
所以需要調整 webpack.config.js 的 styleRule 如以下  
```javascript

// 以上略 ...

const styleRule = {
  test: /\.s[ac]ss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'postcss-loader', {
      loader: 'sass-loader',
      options: {
        data: `@import '@/_variables.scss`
      }
    }
  ]
}

// 以下略 ...
```

並且因為我們現在使用到了 `alias`，所以我們要新增設定讓 webpack 認得
在 webpack.config.js 中的 `reslove` 設定中新增 `alias` 設定。

```javascript

// 以上略 ...

const resolve = {
  extensions: [".tsx", ".ts", ".js"],
  alias: {
    '@': rootResolve('src')
  }
}

// 以下略 ...
```

接著將 `src/App.vue` 文件中的 `<style>` 區塊修改成以下

```scss
h4 {
    color: $primary;
    &:hover {
        color: $success;
    }
}
```

現在關閉並重新執行 `npm run serve` 命令  
打開瀏覽器測試，確認原本 hover 效果的紅色，現在已經變為綠色  

### 下一步

關於樣式的設定其實還有很多，我們會在之後的個別單元中做更深入的介紹  
現在，我們專案中幾個最重要的基本功能已經可以運作，可是程式顯得有點凌亂  
這時候是導入程式語法、風格檢查器的好時機。

傳送門 => [import-eslint-prettier](https://github.com/cian6390/vue-spa/blob/master/documents/import-eslint-prettier.md)

#### Reference
- [browserlist](https://github.com/browserslist/browserslist)
- [autoprefixer](https://github.com/postcss/autoprefixer#options)
- [node-sass](https://github.com/sass/node-sass)
- [postcss](https://github.com/postcss/postcss)
- [postcss-loader](https://github.com/postcss/postcss-loader)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)
- [webpack#sass-loader](https://webpack.js.org/loaders/sass-loader/#root)
