<template>
  <div class="home-nav-bar">
    <nav-bar>
      <template #center>
        <span>大黄车</span>
        <span class="subtitle">(测试版)</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import { NavBar } from "components/common/NavBar";

export default {
  name: "HomeNavBar",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5rem;
}
.subtitle {
  letter-spacing: 0.1rem;
  font-size: small;
}
</style>
