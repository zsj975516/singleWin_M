import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elementUI)

Vue.prototype.$electron.ipcRenderer.on('questClose', (ev, arg) => {
  let res = window.confirm('是否确认关闭？', '系统提示')
  Vue.prototype.$electron.ipcRenderer.send('answerClose', {
    name: arg,
    answerClose: res
  })
})

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
