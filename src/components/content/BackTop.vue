<template>
  <div class="back-top">
    <img src="~assets/icon/top.png" alt="回到顶部小图标" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style scoped>
.back-top {
  z-index: 99;
  position: fixed;
  bottom: 10%;
  right: 5%;
}
img {
  width: 2rem;
  height: 2rem;
}
</style>
