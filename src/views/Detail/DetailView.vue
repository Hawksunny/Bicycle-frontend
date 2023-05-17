<template>
  <div class="detail-view">
    <!-- 顶部导航栏 -->
    <detail-nav-bar />

    <!-- 主体内容（可滚动） -->
    <my-scroll class="scroll-wrapper">
      <!-- 顶部轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 单车信息 -->
      <detail-bike-info :bike-info="bikeInfo" />
      <!-- 站点信息 -->
      <detail-station-info :station-info="stationInfo" />
      <!-- 占位div -->
      <div v-for="x in 5" :key="x" style="color: transparent">{{ x }}</div>
    </my-scroll>

    <!-- 租赁提交按钮 -->
    <div class="button">
      <van-button
        type="info"
        block
        size="large"
        loading-text="加载中..."
        icon="scan"
        @click="onRentBtnClick"
        >租它</van-button
      >
    </div>
    <!-- 待提交表单 -->
    <van-popup v-model="showForm" round :style="{ width: '80%' }">
      <van-form @submit="onSubmit">
        <div style="margin: 16px">
          <van-cell-group>
            <van-field
              v-model="uid"
              label="租者"
              name="user"
              placeholder="请输入用户ID"
              disabled
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              v-model="bike"
              readonly
              name="bike"
              label="单车"
              disabled
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              v-model="outStation"
              name="outStation"
              readonly
              label="出站"
              disabled
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              clickable
              name="datetimePicker"
              v-model="backTimeLocal"
              label="归还"
              placeholder="点击选择时间"
              @click="showPicker = true"
            />
            <van-cell-group>
              <van-field v-model="fee" label="费用" type="number" name="fee" />
            </van-cell-group>
          </van-cell-group>
          <div style="width: 100%; height: 10px"></div>
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </van-popup>

    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="backTime"
        type="datatime"
        title="请选择归还时间"
        @confirm="onPickerTime"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!-- 支付界面 -->

    <van-popup
      v-model="showPayment"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ width: '100%' }"
    >
      <van-submit-bar
        :price="fee_convert"
        button-text="支付"
        @submit="onPayment"
      />
    </van-popup>
  </div>
</template>

<script>
import DetailNavBar from "./childCmps/DetailNavBar";
import DetailSwiper from "./childCmps/DetailSwiper";
import DetailBikeInfo from "./childCmps/DetailBikeInfo";
import DetailStationInfo from "./childCmps/DetailStationInfo";

import {addOrder, getBikeInfo, getStationInfo, updateBikeInfo,} from "network/detail.js";

import Vue from "vue";
import {Toast} from "vant";

Vue.use(Toast);

export default {
  name: "DetailView",

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBikeInfo,
    DetailStationInfo,
  },

  data() {
    return {
      iid: 0, // 单车ID
      sid: 0, // 站点ID
      backStation: 1, // 归还站点ID， 默认为1
      bikeInfo: {}, // 单车信息
      stationInfo: {}, // 站点信息
      backTime: new Date(), // 归还时间
      fee: 30, // 固定服务费30
      topImages: [
        {
          id: 0,
          src: "https://th.bing.com/th/id/R.870eea76bae7abb533c617f3c4d17c74?rik=UPbHckjn5D%2fi4Q&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f50025%2f7597.jpg_wh860.jpg&ehk=It%2bXuPYtXji1zecv07lt3sE6mDE%2fo8w8VIPbAaCdHdc%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 1,
          src: "https://img95.699pic.com/photo/50134/9062.jpg_wh860.jpg",
        },
        {
          id: 2,
          src: "https://img1.qunarzz.com/travel/poi/1511/a0/ede0263129f6bf7.jpg_r_480x360x95_1c92ed0e.jpg",
        },
        {
          id: 3,
          src: "https://th.bing.com/th/id/OIP.anpEDH6TH7cHncgxJ8X2NAHaE5?pid=ImgDet&rs=1",
        },
        {
          id: 4,
          src: "https://th.bing.com/th/id/R.af413beb077c2bab501d0aa53979d9c7?rik=yxqaRq%2bfiOZWfw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-wizeQteutoU%2fVgFLFrwsEjI%2fAAAAAAAAFkc%2fSYopFVvQ7_E%2fs1600%2fDSCF2495.jpg&ehk=Y7KxqYebH8bbhPzIsbSlO6KFmcpBEl3ZYrkHIVq8bhg%3d&risl=&pid=ImgRaw&r=0",
        },
      ], // 轮播图
      showForm: false, // 是否展示表单
      showPicker: false, // 是否展示时间选择器
      showPayment: false, // 是否展示支付弹窗
      isPayed: false, // 是否支付成功
    };
  },

  computed: {
    uid() {
      return this.$store.state.uid || localStorage.getItem("uid");
    },
    backTimeLocal() {
      return this.backTime.toLocaleString();
    },
    bike() {
      return (
        this.bikeInfo.brand +
        "-" +
        this.bikeInfo.type +
        "-" +
        this.bikeInfo.color
      );
    },
    outStation() {
      return this.stationInfo.address + "-" + this.stationInfo.stationName;
    },
    fee_convert() {
      return Number(this.fee) * 100;
    },
  },

  created() {
    // 从路由参数获取当前单车id
    this.iid = this.$route.params.iid;
    // 获取当前单车信息和对应站点信息
    getBikeInfo(this.iid)
      .then(res => {
        this.bikeInfo = res.result;
        this.sid = this.bikeInfo.fromStation;
        return getStationInfo(this.sid);
      })
      .then(res => {
        this.stationInfo = res.result;
      });
  },

  methods: {
    onRentBtnClick() {
      if (this.bikeInfo.status === 1) {
        this.showForm = true
      } else {
        Toast("车辆被占用或维修, 无法租用");
      }
    },
    // 订单提交事件处理函数
    onSubmit() {
      addOrder({
        // 向服务器提交的表单
        paymentId: 0,
        uid: Number(this.uid),
        bikeId: Number(this.iid),
        rentalTime: new Date().toISOString(),
        rentalStation: Number(this.sid),
        backTime: new Date(this.backTime).toISOString(),
        backStation: Number(this.backStation),
        fee: Number(this.fee),
      })
        .then((res) => {
          // 调试信息
          console.log(res);
          // 消息提示
          Toast("提交成功！");
          // 唤出支付页面
          this.showForm = false;
          this.showPayment = true;
          this.bikeInfo.status = 0;
          updateBikeInfo(this.bikeInfo)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          Toast("提交失败 :(");
        });
    },
    // 时间选择事件处理函数
    onPickerTime() {
      this.showPicker = false;
      Toast("已选择归还时间~");
    },
    // 支付事件处理函数
    onPayment() {
      // 用户交互
      this.showPayment = false;
      Toast("支付成功！");
      // 修改相应参数和数据库记录
      this.isPayed = true;
    },
  },
};
</script>

<style scoped>
.detail-view {
  position: relative;
  z-index: 10;
  background-color: rgb(255, 255, 255);
  height: 100vh;
}
.scroll-wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.button {
  position: fixed;
  bottom: 0;
  width: 100vw;
  max-height: 49px;
}
</style>
