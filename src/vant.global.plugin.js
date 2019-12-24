// vant UI框架的全局配置
import Vue from 'vue'
import { Notify, Toast } from 'vant'

Vue.prototype.$toast = Toast

Vue.use(Notify)
Vue.use(Toast)