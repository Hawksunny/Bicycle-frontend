<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template #left>
        <img src="~assets/icon/back.svg" alt="返回" @click="backClick" />
      </template>
      <template #center>
        <ul>
          <li
            v-for="(item, index) in navBarTabs"
            :key="item"
            @click="tabClick(index)"
            :class="{ active: isActive(index) }"
          >
            {{ item }}
          </li>
        </ul>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import { NavBar } from "@/components/common/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      navBarTabs: ["单车", "参数", "站点", "状态"],
      curIndex: 0,
    };
  },
  methods: {
    tabClick(index) {
      this.curIndex = index;
    },
    backClick() {
      this.$router.back();
    },
    isActive(index) {
      return this.curIndex === index;
    },
  },
};
</script>

<style scoped>
.detail-nav-bar {
  background-color: #fff;
}
ul {
  display: flex;
  padding: 0 2rem;
}
ul li {
  flex: 1;
  text-align: center;
}
.active {
  color: var(--color-highlight-text);
}
</style>
