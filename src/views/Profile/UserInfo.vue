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

  <van-popup v-model="showBaseInfo" round position="top">
    <van-form @submit="onSubmit">
      <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="telephone"
          name="电话"
          label="电话"
          placeholder="电话"
          :rules="[{ required: true, message: '请填写电话' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">确认修改</van-button>
      </div>
    </van-form>
  </van-popup>

  <van-popup v-model="showResetPasswd" round position="top">
    <van-form @submit="onSubmit">
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="password_repeat"
          type="password"
          name="重复密码"
          label="重复密码"
          placeholder="重复密码"
          :rules="[
             {
               validator,
               message: '两次密码不一致'
             },
             {
               required: true,
               message: '请重复密码'
             }
          ]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">确认修改</van-button>
      </div>
    </van-form>
  </van-popup>

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
import {modifyBaseInfo, modifyPasswd} from "network/profile";
import {Toast} from "vant";

export default {
  name: "UserInfo",
  data() {
    return {
      showPopover: false,
      showBaseInfo: false,
      showResetPasswd: false,
      username: null,
      password: null,
      password_repeat: null,
      telephone: null,
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
      if (action.text === "基本信息") {
        this.showBaseInfo = true;
      } else {
        this.showResetPasswd = true;
      }
    },
    validator() {
      return this.password_repeat === this.password;
    },
    onSubmit() {
      if (this.showBaseInfo) {
        modifyBaseInfo(this.username, this.telephone, parseInt(this.loginUser.uid)).then(res => {
          Toast(res.msg);
        })
      } else if (this.showResetPasswd) {
        modifyPasswd(this.password, parseInt(this.loginUser.uid)).then(res => {
          Toast(res.msg);
        })
      }
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
  height: calc(100vh - 46px - 49px);
  overflow: hidden;
}
</style>