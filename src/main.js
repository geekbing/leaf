// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router'
import '@/assets/iconfont/iconfont'
import IconSvg from './components/Icon-svg.vue'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('icon-svg', IconSvg)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
