<template>
<div>
  <van-nav-bar
      title="个人信息"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
      right-text="修改"
      @click-right="oncClickRight"
  />
</div>
</template>

<script>
export default {
  name: "UserInfo",
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>

</style>