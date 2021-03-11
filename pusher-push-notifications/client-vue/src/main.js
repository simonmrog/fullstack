import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import serviceWorkerRegister from "./serviceWorkerRegister.js";

Vue.config.productionTip = false;

serviceWorkerRegister();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
