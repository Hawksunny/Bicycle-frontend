<template>
  <div class="profile-view">
    <div v-if="!isLogin" class="not-log">
      <p class="hint">用户未登录，请登录或注册~</p>
      <button class="btn" @click="showLogin = true">登录/注册</button>
    </div>
    <div v-else class="has-log">
      <van-button round type="danger" class="logout-btn" @click="logout">登出</van-button>
      <h2>欢迎，{{loginUser.username}}</h2>
      <div class="label">
        <span>权限：</span>
        <span v-if="loginUser.isStaff" style="color:orangered;">管理员</span>
        <span v-else style="color:lawngreen;">用户</span>
        <span style="margin-left: 4rem;">登录时间：{{loginTime}}</span>
      </div>
      <ul>
        <li @click="$router.push('/userInfo')">个人信息<i class="right-arrow"></i></li>
        <li v-if="isRoot" @click="$router.push('/userManage')">用户管理<i class="right-arrow"></i></li>
        <li v-if="isRoot" @click="$router.push('/bikeManage')">单车管理<i class="right-arrow"></i></li>
        <li v-if="isRoot" @click="$router.push('/orderManage')">订单管理<i class="right-arrow"></i></li>
      </ul>
    </div>

    <van-dialog v-model="showLogin"
                title="用户登录"
                show-cancel-button
                confirm-button-text="提交"
                :beforeClose="login"
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
import {isTokenExpired, userLogin} from "network/profile";
import {Toast} from "vant";

export default {
  name: "ProfileView",
  data() {
    return {
      isLogin: false,
      showLogin: false,
      username: null,
      password: null,
      loginUser: {},
    }
  },
  computed: {
    loginTime() {
      return new Date().toLocaleString();
    },
    isRoot() {
      return this.loginUser.isStaff;
    }
  },
  methods: {
    login(action, done) {
      if (action === "confirm") {
        userLogin(this.username, this.password).then(res => {
          console.log(res);
          if (res.success) {
            Toast("登录成功喵～");
            this.isLogin = true;
            this.loginUser = res.result;
            this.isRoot = this.loginUser.isStaff;
            // 把token和用户信息存进localStorage
            localStorage.setItem("token", res.msg);
            localStorage.setItem("loginUser", JSON.stringify(this.loginUser));
          } else {
            Toast(res.msg);
          }
          done();
        });
      } else {
        done();
      }
    },
    logout() {
      this.isLogin = false;
      Toast(`再见，${this.loginUser.username}~`);
      localStorage.removeItem("token");
      localStorage.removeItem("loginUser");
    },

  },
  created() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      isTokenExpired(token).then(res => {
        if (res.success) {
          this.isLogin = true;
          this.loginUser = JSON.parse(localStorage.getItem("loginUser"));
        } else {
          this.isLogin = false;
          localStorage.removeItem("token");
          localStorage.removeItem("loginUser");
        }
      })
    } else this.isLogin = false;
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
.has-log>h2 {
  margin: 1rem 0 1rem 2rem;
  color: #ffa900;
  text-align: left;
  text-shadow: 1px 1px 2px #ffb900;
}
.has-log>.label {
  text-align: justify;
  font-size: .6rem;
  margin: .5rem 0;
  padding: 0 2rem;
  background-color: #eeeeee;
  line-height: 2rem;
}
.has-log>ul {
  font-size: 1rem;
  width: 100vw;
  margin: 2rem 0;
  overflow: scroll;
}
.has-log>ul>li {
  color: #666666;
  background-color: #f0f0f0;
  /*border: 1px solid #ffa900;*/
  border-radius: .5em;
  margin: .5em 2rem;
  cursor: pointer;
  padding: .3em 1em;
  position: relative;
  transition: all .1s ease-in-out;
}
.has-log>ul>li:hover {
  font-weight: bolder;
  color: #f9f9f9;
  background-color: #ffa900;
}
.has-log>ul>li:active {
  background-color: #ffb900;
}
.right-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  width: 0;
  height: 0;
  border-top: 3px solid #ffa900;
  border-right: 3px solid #ffa900;
  border-bottom: 9px solid transparent;
  border-left: 9px solid transparent;
  transform: rotate(45deg) translateY(-50%);
}
.logout-btn {
  position: fixed;
  top: 16px;
  right: 1rem;
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
}
</style>
