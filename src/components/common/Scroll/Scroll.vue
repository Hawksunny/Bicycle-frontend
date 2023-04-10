<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import MouseWheel from "@better-scroll/mouse-wheel";

BScroll.use(Pullup);
BScroll.use(MouseWheel);

export default {
  name: "ScrollCmp",
  props: {
    // 选择滚动事件的派发类型: 0-不派发|1-派发|2-实时派发|3-实时派发全部滚动
    probeType: {
      type: Number,
      default: 0,
    },
    // 是否派发列表点击事件
    click: {
      type: Boolean,
      default: true,
    },
    // 是否派发上拉加载事件
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20, // 20ms == 1 tick
    },
    // 是否开启鼠标滚轮
    mouseWheel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 确保wrapper的DOM已经渲染,正确计算content高度以保证滚动正常
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    /**
     * 初始化 BetterScroll
     */
    initScroll() {
      if (!this.$refs.wrapper) {
        console.log("wrapper未渲染完毕");
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad,
        mouseWheel: this.mouseWheel,
      });
      if (this.probeType !== 0) {
        this.scroll.on("scroll", (pos) => {
          this.$emit("scroll", pos);
        });
      }
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }
    },
    /**
     * 用 Vue 代理 BetterScroll 的方法
     */
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      console.log("refreshed");
      this.scroll && this.scroll.refresh();
    },
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    getScrollY() {
      return this.scroll && this.scroll.y;
    },
  },
};
</script>

<style scoped></style>
