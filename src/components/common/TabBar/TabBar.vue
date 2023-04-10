<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
.tab-bar {
  /* 定位相关 */
  display: flex;
  text-align: center;
  height: 49px;
  /* 颜色相关 */
  background-color: #f0f0f0;
  box-shadow: 0 -2px 2px rgba(150, 150, 150, 0.08);
}
</style>
