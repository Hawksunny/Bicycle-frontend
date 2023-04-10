<template>
  <div class="detail-view">
    <!-- 顶部导航栏 -->
    <detail-nav-bar />
    <my-scroll class="scroll-wrapper">
      <!-- 顶部轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 单车信息 -->
      <detail-bike-info :bike-info="bikeInfo" />
      <!-- 站点信息 -->
      <detail-station-info :station-info="stationInfo" />
    </my-scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childCmps/DetailNavBar";
import DetailSwiper from "./childCmps/DetailSwiper";
import DetailBikeInfo from "./childCmps/DetailBikeInfo";
import DetailStationInfo from "./childCmps/DetailStationInfo";

import { getBikeInfo, getStationInfo } from "network/detail.js";

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
      iid: null,
      topImages: [
        {
          id: 0,
          src: 'https://www.shutterstock.com/image-photo/yellow-black-29er-mountainbike-thick-600w-1498702814.jpg',
        },
        {
          id: 1,
          src: 'https://www.shutterstock.com/image-photo/yellow-29er-mountain-bike-isolated-600w-399272860.jpg',
        },
      ],
      bikeInfo: {},
      stationInfo: {},
    };
  },
  
  created() {
    // 从路由参数获取当前单车id
    this.iid = this.$route.params.iid;
    // 获取当前单车信息和对应站点信息
    getBikeInfo(this.iid).then((res) => {
      this.bikeInfo = res.result[0];
      let id = this.bikeInfo.fromStation;
      return getStationInfo(id);
    }).then((res) => {
      this.stationInfo = res.result[0];
    });
  },
};
</script>

<style scoped>
.detail-view {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.scroll-wrapper {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
