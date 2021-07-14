import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
// import VcPiechart from 'vc-piechart'
// import 'vc-piechart/dist/lib/vc-piechart.min.css'

Vue.config.productionTip = false
// Vue.use(VcPiechart)

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
