
# ServiceWorker

啟用 ServiceWorker 後，可以在使用者有網路時將 fetch response cache 起來  
之後使用者若對相同的 URL 再次呼叫，應用程式可以從 cache 裡直接回應  
如此一來，即便在之後使用者網路不穩定的時候，應用程式也有一定程度的響應能力  

## 準備

- public/images/vue.png

## 概念

### ServiceWorker.ts 的部分

- 檢查瀏覽器是否支援 ServiceWorker
- 監聽 window.load 事件，並 `register` ServiceWorker

### sw.js 的部分
當 ServiceWorker 被 `register` 之後 `sw.js` 開始接手  
我們將會把 install、fetch、activate .... 等等具體處理行為寫在 `sw.js`

## 實作

由於接下來的流程會使用到 nodejs 全域變數 `process`，因此需要安裝 `@types/node`  

```shell
npm install --save-dev @types/node
touch src/ServiceWorker.ts
touch public/sw.js
```

### ServiceWorker.ts

```typescript
const isProduction = process.env.NODE_ENV === 'production'
const supportServiceWorker = 'serviceWorker' in navigator
const sw = '/sw.js'

// 符合條件才註冊 ServiceWorker，這裡僅需處理註冊
if (isProduction && supportServiceWorker) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register(sw)
      .then(function(registration) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed: ', err)
      })
  })
}
```

### sw.js

在 `ServiceWorker.ts` 註冊成功後，後續的 cache 相關業務都交由 `sw.js` 處理。  

```javascript
// 定義 cache 名稱
const CACHE_NAME = 'vue-spa-example-v1'
// 該 cache 所想要 cache 的目標
const urlsToCache = ['/', '/bundle.js', '/images/vue.png']

// 等待 instaall 事件
// 並且在 install 停留直到 cache 被打開
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

// 激活 cache 程序
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

// 監聽 fetch 事件
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // 有 cache，直接回傳 cache 的資料
      if (response) {
        return response
      }

      // 沒有 cache, clone 一個 request
      // 並再次拋出 fetch rquest 請求
      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(function(response) {
        // 如果沒有符合這三個基本要件，就不 cache
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        // 符合 cache 要件，複製並 cache 結果
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})
```

### webpack.config.js

```javascript
// ... 一些其他設定

const plugins = [
  new VueLoaderPlugin(),
  new CopyPlugin([
    {
      from: rootResolve('public/index.html'),
      to: rootResolve('dist/index.html')
    },
    // 將 sw.js 也複製到 dist
    {
      from: rootResolve('public/sw.js'),
      to: rootResolve('dist/sw.js')
    },
    // 將 images 也複製到 dist
    {
      from: rootResolve('public/images'),
      to: rootResolve('dist/images')
    }
  ])
]
// ... 一些其他設定
```

## 下一步

現在我們知道怎麼讓資源可被離線瀏覽  
下一步就可以來讓我們的網站像個 App 那樣安裝到手機之中！

傳送門 => [EP9. manifest.json](https://github.com/cian6390/vue-spa/blob/master/documents/ep9-manifest.md)
