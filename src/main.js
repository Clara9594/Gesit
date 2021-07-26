import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$api = 'https://gesit.hasura.app/api';
Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false


new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
