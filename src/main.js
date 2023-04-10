import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* 在 Vue 原型上添加的自定义属性 */
// 添加自己封装的网络请求函数
import { haks } from "./network/request";
Vue.prototype.$haks = haks;

// 添加 Vuex 中的 mutaion type 到全局，方便使用
import * as types from "@/store/mutaion-types";
Vue.prototype.$x_types = types;

// 全局注册 Scroll 组件
import { Scroll } from "components/common/Scroll";
Vue.component("my-scroll", Scroll);

// 定义事件总线，以实现组件间通信
Vue.prototype.$bus = new Vue();

/* 创建 Vue 实例 */
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
