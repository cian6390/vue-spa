import Vue from 'vue'
import App from './App.vue'
import './ServiceWorker'

new Vue({
  render: function(h) {
    return h(App)
  }
}).$mount('#app')
