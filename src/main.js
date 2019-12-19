import Vue from 'vue'
import router from '@/router'
import App from './App.vue'
import vConsole from 'vconsole' // eslint-disable-line
import globalConfig from '@/global.config' // eslint-disable-line
import vantPlugin from '@/vant.global.plugin' // eslint-disable-line
import reset from '@/assets/reset.scss' // eslint-disable-line
Vue.config.productionTip = false

new vConsole()

new Vue({
  el: "#app",
  router,
  render: h => h(App)
})
