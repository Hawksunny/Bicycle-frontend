<template>
  <div class="profile-view">
    <div v-if="!isLogin" class="not-log">
      <p class="hint">用户未登陆，请登陆或注册~</p>
      <button class="btn" @click="showLogin = true">登陆/注册</button>
    </div>
    <div v-else class="has-log">用户信息</div>
    <van-dialog v-model="showLogin" title="用户登陆"
                show-cancel-button
                confirm-button-text="提交"
                @confirm="login"
    >
      <van-form>
        <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info">注册</van-button>
        </div>
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import {userLogin} from "network/profile";

export default {
  name: "ProfileView",
  data() {
    return {
      isLogin: false,
      showLogin: false,
      username: null,
      password: null,
    }
  },
  methods: {
    login() {
      userLogin(this.username, this.password).then(res => {
        console.log(res);
      })
    }
  }
};
</script>

<style scoped>
.profile-view {
  position: relative;
  height: calc(100vh - 49px);
  width: 100vw;
}
.not-log {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
}
.not-log>.btn {
  display: inline-block;
  margin-top: 2em;
  width: 8em;
  height: 8em;
  border: .5em outset orange;
  background-color: rgba(255, 184, 59, .7);
  color: rgb(181, 109, 33);
  border-radius: 50%;
  cursor: pointer;
  font-weight: 900;
  letter-spacing: .2em;
  transition: all .2s ease-in-out;
}
.not-log>.btn:hover {
  box-shadow: 0 0 .8em .2em rgba(66, 66, 66, .3);
}
.not-log>.btn:active {
  background-color: rgba(255, 184, 59, 1);
}
</style>
