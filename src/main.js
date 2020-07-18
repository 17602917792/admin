import Vue from "vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "./assets/css/reset.less";
import App from "./App.vue";

Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");