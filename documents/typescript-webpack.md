
# TypeScript
將 typescript 安裝至目錄後，事實上可以使用 `npx tsc` 命令編譯 `.ts` 文件，  
但以現代前端開發來說，僅編譯 `.ts` 是不夠的，通常會搭配 webpack 一起打包程式。  
這個文件說明該如何讓 webpack 編譯 `.ts` 文件。  

> 在開始之前請先確定您已經安裝所有的[基本套件](https://github.com/cian6390/vue-spa#packages)  

## 依賴套件

- ts-loader  

```shell
npm install --save-dev ts-loader
```

## 編輯 tsconfig.js

```javascript
// tsconfig.js
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es5"
  }
}
```

這還是個非常簡陋設定檔，但它足夠讓 typescript 完成目前的任務  
它告訴 typescript 我們所使用的 module 是最新的 js 語法 `esnext`  
並且我們想把程式編譯成 `es5`。

## 編輯 webpack.config.js

```javascript
// webpack.config.js
const path = require("path")

module.exports = {
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

## 編輯 src/main.ts
```typescript
// src/main.ts

class Foo {
    greeting() {
        console.log('Hello world')
    }
}

(new Foo()).greeting()
```

## 編輯 package.json
在 scripts 的欄位中加入以下內容
```
"build": "webpack"
```

現在執行 `npm run build` 確認 webpack 將 `./src/main.ts` 編譯成 `./dist/bundle.js`  

### then?
現在我們可以編譯出瀏覽器看得懂的 js 文件了，但還沒有一個好的方式確認結果  
下一個單元說明，如何使用 [webpack-dev-server](#) 來查看程式執行結果。

傳送門 => [webpack-dev-server](#)

#### 相關文件
- [webpack - TypeScript](https://webpack.js.org/guides/typescript/)