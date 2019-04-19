const isProduction = process.env.NODE_ENV === 'production'
const supportServiceWorker = 'serviceWorker' in navigator
const sw = '/sw.js'
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
