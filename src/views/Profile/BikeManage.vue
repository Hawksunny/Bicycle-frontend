<template>
<div>
  <van-nav-bar
      title="单车管理"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
      class="nav-bar"
      fixed
      placeholder
  />

  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

  </van-pull-refresh>
</div>
</template>

<script>
export default {
  name: "BikeManage",
  data() {
    return {
      refreshing: false,
    }
  },
  methods: {
    onRefresh() {

    }
  }
}
</script>

<style scoped>

</style>