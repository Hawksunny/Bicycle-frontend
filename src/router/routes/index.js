const routes = [
  {
    path: "/",
    redirect: "/profile",
  },
  {
    path: "/userInfo",
    name: "userInfo",
    component: () => import("@/views/Profile/UserInfo"),
    meta: {
      title: "用户信息-共享单车",
    }
  },
  {
    path: "/userManage",
    name: "userManage",
    component: () => import("@/views/Profile/UserManage"),
    meta: {
      title: "用户管理-共享单车",
    }
  },
  {
    path: "/bikeManage",
    name: "bikeManage",
    component: () => import("@/views/Profile/BikeManage"),
    meta: {
      title: "单车管理-共享单车",
    }
  },
  {
    path: "/orderManage",
    name: "orderManage",
    component: () => import("@/views/Profile/OrderManage"),
    meta: {
      title: "订单管理-共享单车",
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView"),
    meta: {
      title: "登录界面-共享单车",
    },
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
