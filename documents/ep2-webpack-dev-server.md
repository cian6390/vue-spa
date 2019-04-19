
# webpack-dev-server

## 目標
1. 將 `/public/index.html` 複製到 `/dist` 目錄之中
2. 使用 webpack-dev-server 將 `/dist` 作為網站根目錄執行網站
3. 在每次編譯時都要先清除 `/dist`，確保每次編譯後的結果都是最新的

## 依賴

### [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

透過 webpack-dev-server 我們可以很快速地建構一個 local server，且能夠具備 [HMR](https://webpack.js.org/concepts/hot-module-replacement/)

### [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)

出了編譯資源以外，有些時候也需要單純的複製資源。

### [rimraf](https://github.com/isaacs/rimraf)

兼容個平台的刪除工具。

```shell
npm install --save-dev rimraf copy-webpack-plugin webpack-dev-server
```

## 設定

### rimraf
將 packages.json 中的 scripts 欄位中的 `"build": "webpack"` 改為以下
```
"build": "rimraf dist && webpack"
```

再次執行 `npm run build` 你會發現，命令會先刪除 `/dist` 目錄，接著才編譯程式。

### copy-webpack-plugin

更新 webpack.config.js 如以下  

```javascript
// webpack.config.js
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

const isProd = process.env.NODE_ENV === 'production'
const mode = isProd ? 'production' : 'development'

const rootResolve = (file) => path.resolve(__dirname, file)

const rules = [
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/
  }
]

const resolve = {
  extensions: [".tsx", ".ts", ".js"]
}

const plugins = [
  new CopyPlugin([
    {
      from: rootResolve("public/index.html"),
      to: rootResolve("dist/index.html")
    }
  ])
]

module.exports = {
  mode,
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: rootResolve("dist")
  },
  resolve,
  module: { rules },
  plugins
}
```

我們不僅加入了 `copy-webpack-plugin` 也將設定檔做了一點小小的整理。  
現在再次重新執行 `npm run build`，確認 `index.html` 能夠被複製到 `/dist` 目錄之中

### webpack-dev-server  

就像 `copy-webpack-plugin` 那樣，我們需要在 webpack.config.js 中新增一些設定  

```javascript
// webpack.config.js

const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

const isProd = process.env.NODE_ENV === 'production'
const mode = isProd ? 'production' : 'development'

const rootResolve = (file) => path.resolve(__dirname, file)

// devServer 的設定
const devServer = {
  contentBase: rootResolve("dist"),
  port: 9000  // 請選擇一個你電腦沒用到的 port
}

const rules = [
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/
  }
]

const resolve = {
  extensions: [".tsx", ".ts", ".js"]
}

const plugins = [
  new CopyPlugin([
    {
      from: rootResolve("public/index.html"),
      to: rootResolve("dist/index.html")
    }
  ])
]

module.exports = {
  mode,
  devServer,    // 將 devServer 設定加入
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: rootResolve("dist")
  },
  resolve,
  module: { rules },
  plugins
}
```

接著加入新的 npm 命令，一樣是寫在 package.json 的 scripts 欄位中

```
"serve": "webpack-dev-server"
```

現在你 package.json 的 scripts 欄位看起來應該要像是這樣
```javascript
{
  // .... 一些其他內容
  "scripts": {
    "test": "jest", // 你可能沒有這個命令，或是有但不一樣，現在可以先忽略
    "build": "rimraf dist && webpack",
    "serve": "webpack-dev-server"
  },
  // .... 一些其他內容
}
```

沒問題之後執行 `npm run serve`，確認你的 `dev-server` 有跑起來  
然後打開瀏覽器輸入網址 `http://localhost:9000`  

如果一切正確，現在你可以看到一個空白的網頁，  
現在我們要確認之前 [typescript-webpack](https://github.com/cian6390/vue-spa/blob/master/documents/typescript-webpack.md) 單元中的編譯結果可以被正確執行  
打開瀏覽器的主控台，看看是否有出現 `Hello world`  
如果沒有看到，那可能是你忘記將在 `public/index.html` 加入 `<script src="/bundle.js"></script>`

> 提醒！`<script src="/bundle.js"></script>` 要加在 `public/index.html`，而不是 `dist/index.html`

## 下一步
有了 `devServer` 看程式解果後，我們可以開始寫一些程式。  
下一個單元我們要使用 typescript + vue 做點東西，  
並且設定 webpack 可以將其編譯讓瀏覽器執行。

傳送門 => [typescript and vuejs](https://github.com/cian6390/vue-spa/blob/master/documents/ep3-typescript-and-vuejs.md)
