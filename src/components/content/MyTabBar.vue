<template>
  <div class="my-tab-bar">
    <tab-bar>
      <!-- 主页 -->
      <tab-bar-item to="/home" :activeColor="activeColor">
        <template #icon>
          <div>
            <img src="~assets/icon/home.svg" alt="home" />
          </div>
        </template>
        <template #icon_ac>
          <div>
            <img src="~assets/icon/home-ac.svg" alt="home-ac" />
          </div>
        </template>
        <template #text>
          <div>
            <span>主页</span>
          </div>
        </template>
      </tab-bar-item>
      <!-- 支付 -->
      <tab-bar-item to="/payment" :activeColor="activeColor">
        <template #icon>
          <div>
            <img src="~assets/icon/payment.svg" alt="payment" />
          </div>
        </template>
        <template #icon_ac>
          <div>
            <img src="~assets/icon/payment-ac.svg" alt="payment-ac" />
          </div>
        </template>
        <template #text>
          <div>
            <span>支付</span>
          </div>
        </template>
      </tab-bar-item>
      <!-- 订单 -->
      <tab-bar-item to="/order" :activeColor="activeColor">
        <template #icon>
          <div>
            <img src="~assets/icon/order.svg" alt="order" />
          </div>
        </template>
        <template #icon_ac>
          <div>
            <img src="~assets/icon/order-ac.svg" alt="order-ac" />
          </div>
        </template>
        <template #text>
          <div>
            <span>订单</span>
          </div>
        </template>
      </tab-bar-item>
      <!-- 我的 -->
      <tab-bar-item to="/profile" :activeColor="activeColor">
        <template #icon>
          <div>
            <img src="~assets/icon/profile.svg" alt="profile" />
          </div>
        </template>
        <template #icon_ac>
          <div>
            <img src="~assets/icon/profile-ac.svg" alt="profile-ac" />
          </div>
        </template>
        <template #text>
          <div>
            <span>我的</span>
          </div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import { TabBar, TabBarItem } from "components/common/TabBar";

export default {
  name: "MyTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return {
      activeColor: "#ffb900",
    };
  },
};
</script>

<style scoped>
img {
  width: 30px;
  height: 30px;
}
</style>
