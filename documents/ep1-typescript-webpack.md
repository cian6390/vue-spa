
# TypeScript
將 typescript 安裝至目錄後，事實上可以使用 `npx tsc` 命令編譯 `.ts` 文件，  
但以現代前端開發來說，僅編譯 `.ts` 是不夠的，通常會搭配 webpack 一起打包程式。  
這個文件說明該如何讓 webpack 編譯 `.ts` 文件。  

> 在開始之前請先確定您已經安裝所有的[基本套件](https://github.com/cian6390/vue-spa#packages)  

## 依賴

### webpack

目前最流行的前端資源處理、打包工具。

### typescript

typescript 型別檢查，使開發更有效率

### [webpack#ts-loader](https://webpack.js.org/guides/typescript/)

webpack 中處理 typescript 的 loader

### 快速安裝

```shell
npm install --save-dev webpack webpack-cli typescript ts-loader
touch ./tsconfig.js
thouch ./webpack.config.js
```

## 設定

### 編輯 tsconfig.js

```javascript
// tsconfig.js
{
  "compilerOptions": {
    "module": "esnext", // 專案使用 esnext 語法
    "target": "es5" // 期望編譯至 es5 語法
  }
}
```

這還是個非常簡陋設定檔，但它足夠讓 typescript 完成目前的任務  
它告訴 typescript 我們所使用的 module 是最新的 js 語法 `esnext`  
並且我們想把程式編譯成 `es5`。

### 編輯 webpack.config.js

```javascript
// webpack.config.js
const path = require("path")

const isProd = process.env.NODE_ENV === 'production'
const mode = isProd ? 'production' : 'development'

module.exports = {
  mode,
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
```

透過以上的設定，webpack 可以將 `./src/main.ts` 編譯並打包至 `./dist/bundle.js`

### 編輯 src/main.ts
```typescript
// src/main.ts

class Foo {
    greeting() {
        console.log('Hello world')
    }
}

(new Foo()).greeting()
```

### 編輯 package.json
在 scripts 的欄位中加入以下內容
```
"build": "webpack"
```

現在執行 `npm run build` 確認 webpack 將 `./src/main.ts` 編譯成 `./dist/bundle.js`  

## 下一步
現在我們可以透過 webpack 編譯出瀏覽器看得懂的 js 文件了，但還沒有一個好的方式確認結果  
下一個單元說明，如何使用 [webpack-dev-server](https://github.com/cian6390/vue-spa/blob/master/documents/webpack-dev-server.md) 來查看程式執行結果。

傳送門 => [webpack-dev-server](https://github.com/cian6390/vue-spa/blob/master/documents/ep2-webpack-dev-server.md)
