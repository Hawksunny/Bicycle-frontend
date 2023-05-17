<template>
  <div class="home-view">
    <!-- 顶部导航栏 -->
    <home-nav-bar class="home-nav-bar" />
    <!-- 切换标签页（暂时未实现） -->
    <tab-control
      class="tab-control"
      :tabs="goodsTypes"
      @tabControlClick="tabControlClick"
      v-show="isTabControlFixed"
    />
    <!-- 回到顶部按钮 -->
    <back-top v-show="isBackTopShow" @click.native="backTop" />
    <!-- 主页内容（可滚动查看） -->
    <my-scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="2"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMoreGoods"
    >
      <tab-control
        class="tab-control"
        ref="tab-control"
        :tabs="goodsTypes"
        @tabControlClick="tabControlClick"
      />
      <!-- 商品列表 -->
      <goods-list :goods="bikeList" />
      <!-- 上拉加载 -->
      <div class="pullup-tips">
        <div v-if="!isGoodsLoading">
          <span>上拉加载更多</span>
        </div>
        <div v-else>
          <span>加载中...</span>
        </div>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import HomeNavBar from "./childCmps/HomeNavBar.vue";

import TabControl from "components/content/TabControl.vue";
import { GoodsList } from "components/content/GoodsCard";
import BackTop from "components/content/BackTop.vue";

import { getBikes } from "network/home";
import { debounce } from "@/assets/js/utils";
import {Toast} from "vant";

export default {
  name: "HomeView",

  components: {
    HomeNavBar,
    TabControl,
    GoodsList,
    BackTop,
  },

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      goodsTypes: ["推荐", "最近", "收藏"],
      curGoodsType: "pop",
      isBackTopShow: false,
      isGoodsLoading: false,
      tabControlOffsetTop: 0,
      isTabControlFixed: false,
      scrollY: 0,

      bikeList: [],
    };
  },

  computed: {
  },

  created() {
    this.getSomeBike();
  },

  mounted() {
    // 1. 每次图片加载完成都让scroll重新计算可滚动内容高度，以确保不出bug
    const refresh = debounce(this.$refs.scroll.refresh, 200); // 防抖处理
    this.$bus.$on("goodImgLoaded", () => {
      refresh();
    });
    // 2. 获取DOM渲染完后tabControl对应DOM的offSetTop属性
    this.$bus.$on("swiperImgLoaded", () => {
      this.tabControlOffsetTop = this.$refs["tab-control"].$el.offsetTop;
    });
  },

  activated() {
    // console.log(this.scrollY);
    this.getSomeBike();
    this.$refs["scroll"].scrollTo(0, this.scrollY, 0);
    // this.$refs["scroll"].refresh();
  },

  deactivated() {
    this.scrollY = this.$refs["scroll"].getScrollY();
  },

  methods: {
    /**
     * 事件监听相关的方法
     */
    tabControlClick(index) {
      // 切换GoodsType
      switch (index) {
        case 0:
          this.curGoodsType = "pop";
          break;
        case 1:
          this.curGoodsType = "new";
          break;
        case 2:
          this.curGoodsType = "sell";
          break;
      }
    },
    contentScroll(pos) {
      // 1. 判断何时显示回到顶部小图标
      this.isBackTopShow = -pos.y > 750;
      // 2. 判断何时固定tabControl
      this.isTabControlFixed = -pos.y > this.tabControlOffsetTop;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    loadMoreGoods() {
    },
    /**
     * 网络请求相关的方法
     */
    getSomeBike() {
      getBikes().then((res) => {
        this.bikeList = [];
        this.bikeList.push(...res.result);
      }).catch(err => {
        Toast(err.data.msg);
      })
    }
  },
};
</script>

<style scoped>
.home-view {
  position: relative;
  height: 100vh;
}
.home-nav-bar {
  position: relative;
  z-index: 10;
}
.scroll-wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control {
  position: relative;
  top: -1px;
  z-index: 9;
}
.pullup-tips {
  padding: 1rem;
  text-align: center;
  color: var(--color-text);
}
</style>
