import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* 在 Vue 原型上添加的自定义属性 */
// 添加自己封装的网络请求函数
import { haks } from "network/request";
Vue.prototype.$haks = haks;

// 添加 Vuex 中的 mutation type 到全局，方便使用
import * as types from "@/store/mutaion-types";
Vue.prototype.$x_types = types;

// 全局注册 Scroll 组件
import { Scroll } from "components/common/Scroll";
Vue.component("my-scroll", Scroll);

// 定义事件总线，以实现组件间通信
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

import {
  Button,
  Form,
  Field,
  CellGroup,
  Cell,
  Popup,
  DatetimePicker,
  SubmitBar,
  Dialog,
  NavBar,
  Popover,
  Empty,
  List,
  PullRefresh,
  ContactCard,
  Switch,
  Row,
  Col,
  Card,
  Icon,
  Image as VanImage,
  Lazyload,
  ImagePreview,
  Tag,
  Radio,
  RadioGroup,
  SwipeCell,
} from "vant";

Vue.use(SubmitBar)
  .use(DatetimePicker)
  .use(Popup)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(Dialog)
  .use(NavBar)
  .use(Popover)
  .use(Empty)
  .use(List)
  .use(PullRefresh)
  .use(ContactCard)
  .use(Switch)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Icon)
  .use(VanImage)
  .use(Lazyload)
  .use(ImagePreview)
  .use(Tag)
  .use(Radio)
  .use(RadioGroup)
  .use(SwipeCell)

/* 创建 Vue 实例 */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
