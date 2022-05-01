import Vue from 'vue'
import App from './App.vue'
//导入store、vue-router
import store from './store/index'
import VueRouter from 'vue-router'
import router from './router/index'
import './mock/mockSever'

Vue.config.productionTip = false

Vue.use(VueRouter)


new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate(){
		Vue.prototype.$bus = this
	}
}).$mount('#app')
