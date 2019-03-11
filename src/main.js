// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import 'uikit'
import 'uikit/dist/css/uikit.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
// Vue.use(VueLazyLoad, {loading: '/static/image/loading.jpg'})
Vue.use(VueLazyLoad, {loading: '/mymusic/static/image/loading.jpg'})
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
