
# manifest.json

可能你在某個地方看過、聽過甚至是用過  
**把一個網站加到手機桌面**這樣的行為  
而這個行為會有兩種結果  
1. 建立了一個單純的網頁捷徑
2. 安裝了一個網頁在手機中

如果我們的網站並沒有啟用 ServiceWorker 以及本篇所將要提的 manifest.json  
那麼將網頁加到手機桌面就是`情況1`，反觀如果做到以上兩點，那就會是`情況2`  

## 所以 manifest 到底是什麼？
簡單來說：**manifest.json 聲明了一個應用程序清單**  
這份清單可以讓以下幾個功能實現  

- 能夠真實存在於用戶主屏幕上
- 在 Android 上能夠全屏啟動，不顯示地址欄
- 控制屏幕方向已獲得最佳效果
- 定義啟動畫面，為你的站點定義主題
- 追蹤你的應用是從主屏幕還是 URL 啟動的

## 準備

- public/images/icon-144x144.png
- public/images/icon-152x152.png

## 實作

### 建立 manifest

```shell
touch ./public/manifest.json
```

```json
{
  "name": "Vue SPA Example",
  "short_name": "VSE",
  "icons": [
    {
      "src": "images/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }
  ],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

### public/index.html

在 `head` 標籤內加入以下內容

```html
<!-- for apple -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Vue SPA Example">
<link rel="apple-touch-icon" href="images/icon-152x152.png">
<!-- for windows -->
<meta name="msapplication-TileImage" content="images/icon-144x144.png">
<meta name="msapplication-TileColor" content="#2F3BA2">
```

### sw.js

更新 cache list

```javascript
// ... 一些其他設定

const urlsToCache = [
  '/',
  '/bundle.js',
  '/images/vue.png',
  '/images/icon-144x144.png',
  '/images/icon-152x152.png'
]

// ... 一些其他設定
```

### webpack.config.js

不要忘了把 `manifest.json` 複製到 `dist` 目錄

```javascript
// ... 一些其他設定
const plugins = [
  new VueLoaderPlugin(),
  new CopyPlugin([
    {
      from: rootResolve('public/index.html'),
      to: rootResolve('dist/index.html')
    },
    {
      from: rootResolve('public/sw.js'),
      to: rootResolve('dist/sw.js')
    },
    {
      from: rootResolve('public/manifest.json'),
      to: rootResolve('dist/manifest.json')
    },
    {
      from: rootResolve('public/images'),
      to: rootResolve('dist/images')
    }
  ])
]
// ... 一些其他設定
```

現在，把使用 `npm run build` 所產生出來的 `dist` 部署在一部有 https 的機器上  
訪問它，並試著把它加到桌面！  
最後，切斷網路打開這個 App，測試它是否可離線訪問。  

如果你沒有 https 機器，可以參考 [Google 免費的 Firebase](https://firebase.google.com/)
