<template>
<div>
  <van-nav-bar
      title="个人信息"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
      class="nav-bar"
  >
    <template #right>
      <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
          placement="bottom-end"
      >
        <template #reference>
          <van-button type="primary" class="modify-btn">修改</van-button>
        </template>
      </van-popover>
    </template>
  </van-nav-bar>

  <my-scroll class="scroll-wrapper">
    <van-cell-group>
      <van-cell title="UID" :value="loginUser.uid" icon="info"/>
      <van-cell title="用户名" :value="loginUser.username" icon="comment-circle"/>
      <van-cell title="电话" :value="loginUser.telephone" icon="phone-circle"/>
      <van-cell title="身份" :value="loginUser.isStaff ? '管理员' : '用户'" icon="manager"/>
    </van-cell-group>
  </my-scroll>
</div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "UserInfo",
  data() {
    return {
      showPopover: false,
      actions: [
        {
          text: "基本信息",
          icon: "user-circle-o",
        },
        {
          text: "重置密码",
          icon: "replay",
        },
      ]
    }
  },
  computed: {
    loginUser() {
      return JSON.parse(localStorage.getItem("loginUser"));
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSelect(action) {
      Toast(action.text);
    }
  }
}
</script>

<style scoped>
/*.nav-bar {*/
/*  background-color: #f9f9f9;*/
/*}*/
.modify-btn {
  height: 2rem;
  width: 4rem;
}
.scroll-wrapper {
  position: absolute;
  top: 46px;
  bottom: 49px;
  left: 0;
  right: 0;
  width: 100vw;
  height: calc(100vh - 46px -49px);
  overflow: hidden;
}
</style>