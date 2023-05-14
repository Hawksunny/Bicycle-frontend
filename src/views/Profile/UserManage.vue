<template>
<div>
  <van-nav-bar
      title="用户管理"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
      class="nav-bar"
      fixed
      placeholder
  />

  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-contact-card type="add" @click="onAdd" add-text="添加用户" />
      <div v-for="item in list" :key="parseInt(item.uid)">
        <van-cell title="UID" :value="item.uid" :border="false" :center="true" />
        <van-contact-card
            type="edit"
            :name="item.username"
            :tel="item.telephone"
            @click="onEdit(item)"
        />
      </div>
    </van-list>
  </van-pull-refresh>

  <van-popup v-model="showUserAdd" round :style="{width:'75%'}">
    <van-form @submit="onSubmit">
      <van-field
          v-model="user.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="user.telephone"
          name="电话"
          label="电话"
          placeholder="电话"
          :rules="[{ required: true, message: '请填写电话' }]"
      />
      <van-field
          v-model="user.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-cell center title="是否为管理员">
        <template #right-icon>
          <van-switch v-model="user.isStaff" size="24" />
        </template>
      </van-cell>
      <div style="margin: 16px;">
        <van-button round block type="danger" native-type="submit">添加</van-button>
      </div>
    </van-form>
  </van-popup>

  <van-popup v-model="showUserEdit" round :style="{width:'75%'}">
    <van-form>
      <van-field
          v-model="user.uid"
          name="UID"
          label="UID"
          placeholder="UID"
          disabled
      />
      <van-field
          v-model="user.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
      />
      <van-field
          v-model="user.telephone"
          name="电话"
          label="电话"
          placeholder="电话"
      />
      <van-field
          v-model="user.password"
          name="密码"
          label="密码"
          placeholder="密码"
      />
      <van-cell center title="是否为管理员">
        <template #right-icon>
          <van-switch v-model="user.isStaff" size="24" />
        </template>
      </van-cell>
      <div style="margin: 16px;">
        <van-row
          type="flex"
          justify="space-around"
        >
          <van-col span="10">
            <van-button round block type="info" @click="userEdit">修改</van-button>
          </van-col>
          <van-col span="10">
            <van-button round block type="danger" @click="userDelete">删除</van-button>
          </van-col>
        </van-row>
      </div>
    </van-form>
  </van-popup>
</div>
</template>

<script>
import {Toast, Dialog} from "vant";
import {addUser, deleteUser, getUserList, updateUser} from "network/profile";

export default {
  name: "UserManage",
  data() {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      refreshing: false,
      pageNumber: 0,
      pageSize: 10,
      showUserAdd: false,
      showUserEdit: false,
      user: {
        uid: 0,
        username: null,
        password: null,
        telephone: null,
        isStaff: false,
      }
    };
  },
  methods: {
    onLoad() {
      this.pageNumber++;
      let pageNumber = parseInt(this.pageNumber);
      let pageSize = parseInt(this.pageSize);
      getUserList(pageNumber, pageSize).then(res => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        this.list = [...this.list, ...res.result];
        this.loading = false;
        Toast("加载成功")

        if (res.result.length === 0) {
          this.finished = true;
        }
      })
    },
    async onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.pageNumber = 0;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      await this.onLoad();
      Toast("刷新成功")
    },
    onAdd() {
      this.showUserAdd = true;
    },
    onSubmit() {
      addUser(this.user).then(res => {
        Toast(res.msg);
      });
      this.showUserAdd = false;
    },
    onEdit(user) {
      this.user = user;
      this.user.uid = parseInt(user.uid);
      this.showUserEdit = true;
    },
    userEdit() {
      updateUser(this.user).then(res => {
        Toast(res.msg);
        this.showUserEdit = false;
      })
    },
    userDelete() {
      Dialog.confirm({
        title: '特别提醒',
        message: '确认删除？该操作不可逆！',
      }).then(() => {
        deleteUser(parseInt(this.user.uid)).then(res => {
          Toast(res.msg);
          this.showUserEdit = false;
          this.list = [];
          this.onRefresh();
        })
      }).catch(() => {
        Toast("取消删除");
      });
    }
  },
}
</script>

<style scoped>
</style>