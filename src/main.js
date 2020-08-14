import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VCharts from 'v-charts';
import util from "./utils";
import exportCSV from './utils/exportCSV'
Vue.use(Antd);
Vue.use(VCharts);
Vue.config.productionTip = false;
Vue.prototype.$util = util;
Vue.prototype.$exportCSV = exportCSV;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
