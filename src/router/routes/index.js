const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/detail/:iid",
    name: "detail",
    component: () => import("@/views/Detail/DetailView"),
    meta: {
      title: "单车详情-共享单车",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home/HomeView"),
    meta: {
      title: "主页-共享单车",
    },
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("@/views/Payment/PaymentView"),
    meta: {
      title: "支付-共享单车",
    },
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/Order/OrderView"),
    meta: {
      title: "订单-共享单车",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile/ProfileView"),
    meta: {
      title: "我的-共享单车",
    },
  },
  {
    path: "*",
    name: "notFound",
    component: () => import("@/views/NotFoundView"),
    meta: {
      title: "页面不存在-共享单车",
    },
  },
];

export default routes;
