
# Https Dev Server

## 依賴

### [dotenv](https://github.com/motdotla/dotenv)

由於每個開發人員的 cert/key 存放位置與檔案都不同，  
因此我們使用 `.env` 來讓開發人員自行設定自己的 cert/key 參數  
當然，如果是個人開發的話，是可以跳過這個流程，直接設定 webpack.config.js 即可  

#### 快速安裝
```shell
npm install --save-dev dotenv
touch ./.env
```

## 設定

### mkcert
如果你不知道如何產生 local certificates，[mkcert](https://github.com/FiloSottile/mkcert) 是一個可以幫助你快速產生這些 cert/key 的工具。

### .env

請設定以下三個 key 在系統中的絕對路徑  

```
HTTPS_KEY=/absolute/path/to/key
HTTPS_CRT=/absolute/path/to/cert
HTTPS_ROOTCA=/absolute/path/to/rootCA.pem
```

### webpack.config.js

確保調整以下幾個重點  

```javascript
// webpack.config.js
const fs = require('fs')
// ... 一些其他 require

require('dotenv').config()
const env = process.env

// ... 一些其他設定

// 在 devServer 的設定中，加入 https 的設定如以下
const devServer = {
  contentBase: rootResolve('dist'),
  port: 9000,
  https: {
    key: fs.readFileSync(env.HTTPS_KEY),
    cert: fs.readFileSync(env.HTTPS_CRT),
    ca: fs.readFileSync(env.HTTPS_ROOTCA)
  }
}
```

現在執行 `npm run serve`，將會以 https 的方式執行

## 下一步

SPA 的基石 ServiceWorker

傳送門 => [ServiceWorker](https://github.com/cian6390/vue-spa/blob/master/documents/ep8-serviceworker.md)
