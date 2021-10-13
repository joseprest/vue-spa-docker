import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import "./registerServiceWorker";

import FlagIcon from "vue-flag-icon";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// some web-components will be injected by blockly
Vue.config.ignoredElements = [
  "xml",
  "block",
  "value",
  "field",
  "category",
  // Use a `RegExp` to ignore all elements that start with "ion-"
  // 2.5+ only
  /^ion-/
];
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(FlagIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
