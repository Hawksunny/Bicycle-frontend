<template>
  <div class="hy-slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SlideCmp",
};
</script>

<style scoped>
.hy-slide {
  width: 100%;
  flex-shrink: 0;
}

.hy-slide img {
  width: 100%;
}
</style>
