// 定義 cache 名稱
const CACHE_NAME = 'vue-spa-example-v1'
// 該 cache 所想要 cache 的目標
const urlsToCache = ['/', '/bundle.js']

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
