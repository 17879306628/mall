import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


// 安装toast插件
Vue.use(toast)

Vue.config.productionTip = false
// 使用事件总线
Vue.prototype.$bus = new Vue()
// 使用移动端300ms延迟
FastClick.attach(document.body)
// 使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')
