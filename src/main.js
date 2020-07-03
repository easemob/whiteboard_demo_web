// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
// import config from './config/config'
// import whiteBoard from './whiteboards'
// console.log(whiteBoards);
Vue.config.productionTip = false

Vue.use(Antd);


// const wb = new whiteBoards({
//   restApi: config.restApi,
// 	appKey: config.appKey
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
