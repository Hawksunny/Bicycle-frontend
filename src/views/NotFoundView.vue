<template>
  <div class="not-found-hint">
    <van-empty description="页面不存在！" image="error">
      <van-button round type="danger" class="bottom-button" @click="$router.back()">返回</van-button>
    </van-empty>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped>
.not-found-hint {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100vw;
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
