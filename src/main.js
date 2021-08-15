import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import moment from 'moment'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'

Vue.use(VueApexCharts)

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://35.219.8.90:90/api';

Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

// Vue.filter('formatDate', function(value) {
//   if (value) {
//     return moment(String(value)).format('LLL')
//   }
// });

Vue.filter('formatTimeline', function(value) {
  if (value) {
    return moment(String(value)).format('LL')
  }
});

Vue.filter('formatTime', function(value) {
  if (value) {
    return moment(String(value)).format('LT')
  }
});

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
