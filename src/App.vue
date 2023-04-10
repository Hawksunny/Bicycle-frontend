<template>
  <div id="app">
    <keep-alive exclude="DetailView">
      <router-view />
    </keep-alive>
    <my-tab-bar id="my-tab-bar" />
  </div>
</template>

<script>
import MyTabBar from "components/content/MyTabBar.vue";

export default {
  name: "App",
  components: {
    MyTabBar,
  },
};
</script>

<style>
@import url(assets/style/base.css);
#app {
  font-size: var(--font-size);
  line-height: var(--line-height);
  width: 100vw;
  height: 100vh;
}
#my-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>
