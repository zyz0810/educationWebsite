import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import directive from './directive/directive'
import {
 MessageBox
} from 'element-ui'
// import './iconfont/iconfont.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters


import '@/styles/reset.css'


Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})


// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
