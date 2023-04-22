<template>
  <div class="detail-bike-info">
    <!-- 一个概括性的标题 -->
    <div class="title">{{ title }}</div>
    <!-- 单车状态信息 -->
    <div class="status-info">
      <i
        class="status-icon info-item"
        :style="{ backgroundColor: statusBgColor }"
      >
        {{ statusIcon }}
      </i>
      <span class="now-status info-item">{{ nowStatus }}</span>
      <span class="bid info-item">BID: {{ bid }}</span>
    </div>
    <!-- 单车基本信息 -->
    <div class="base-info">
      <ul>
        <li>品牌：{{ brand }}</li>
        <li>型号：{{ type }}</li>
        <li>颜色：{{ color }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBikeInfo",
  props: {
    bikeInfo: {
      type: Object,
      default() {
        return {
          brand: "自然之力",
          type: "经济型",
          color: "红色",
          status: 1,
        };
      },
    },
  },
  computed: {
    bid() {
      return this.bikeInfo.id;
    },
    brand() {
      return this.bikeInfo.brand;
    },
    type() {
      return this.bikeInfo.type;
    },
    color() {
      return this.bikeInfo.color;
    },
    status() {
      return this.bikeInfo.status;
    },
    title() {
      return this.brand + "牌-" + this.type + "-" + this.color + "单车";
    },
    nowStatus() {
      let str = "";
      switch (this.status) {
        case 0: str = "被租用"; break;
        case 1: str = "空闲中"; break;
        case 2: str = "待维修"; break;
      }
      return str;
    },
    statusBgColor() {
      let str = "";
      switch (this.status) {
        case 0: str = "red"; break;
        case 1: str = "green"; break;
        case 2: str = "orange"; break;
      }
      return str;
    },
    statusIcon() {
      let str = "";
      switch (this.status) {
        case 0: str = "✗"; break;
        case 1: str = "✓"; break;
        case 2: str = "!"; break;
      }
      return str;
    },
  },
};
</script>

<style scoped>
.detail-bike-info {
  padding: 0 0.4rem;
  border-bottom: 0.3rem solid rgba(150, 150, 150, 0.2);
}
.title {
  padding: 0.8em 0;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1;
  text-align: justify;
  color: #000;
}
.status-info {
  font-size: 0;
  text-align: left;
  padding: 0 0 1rem;
}
.info-item {
  font-size: 1rem;
  padding-right: 0.4rem;
}
.bid {
  float: right;
  position: relative;
  font-size: .8rem;
  bottom: .3em;
}
.now-status {
  font-size: 1rem;
  color: var(--color-price);
  margin-left: .5em;
  position: relative;
  bottom: .5em;
}
.status-icon {
  font-size: 0.8rem;
  position: relative;
  bottom: 0.6rem;
  color: #fff;
  border-radius: 1.2rem;
  padding: 0.2rem 0.5rem;
}
.base-info>ul {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  /* border-bottom: 1px solid rgba(150, 150, 150, 0.2); */
}
.base-info>ul>li {
  font-size: 0.8rem;
  color: #999;
}
</style>
