<template>
  <div class="detail-station-info">
    <div class="top">
      <img src="~assets/icon/bicycle_station_icon.png" alt="站点图标" />
      <span>取车站区</span>
    </div>
    <div class="middle">
      <div class="city">
        <p>{{ addr }}</p>
        <p><strong>站点城市</strong></p>
      </div>
      <div class="station">
        <p>{{ name }} ({{sid}})</p>
        <p><strong>站点名称</strong></p>
      </div>
      <div class="capacity">
        <p>{{ capacity }}</p>
        <p><strong>站点容量</strong></p>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "DetailStationInfo",
  props: {
    stationInfo: {
      type: Object,
      default() {
        return {
          stationName: 'A站区',
          address: '深圳',
          capacity: 0,
        };
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    name() {
      return this.stationInfo.stationName;
    },
    addr() {
      return this.stationInfo.address;
    },
    capacity() {
      return this.stationInfo.capacity;
    },
    sid() {
      return this.stationInfo.id;
    }
  }
};
</script>

<style scoped>
.top {
  font-size: 1.5rem;
  padding: .5em .5em .5em .5em;
  /* text-align: center; */
}
.top img {
  width: 1.8em;
  height: 1.8em;
}
.top span {
  margin-left: .5em;
  letter-spacing: .1em;
  position: relative;
  top: .2em;
  font-weight: 400;
  font-size: 1em;
  margin-left: .5em;
  text-align: center;
}
.middle {
  display: flex;
  text-align: center;
  padding: 1em .5em;
  margin: .5em .8em 1em .8em;
  background-color: #f9f9f9;
  border-radius: 1em;
}
.middle .city {
  flex: 1;
  font-size: 1em;
  font-weight: 400;
  color: gray;
  border-right: 1px solid gray;
}
.middle .station {
  flex: 1;
  font-size: 1em;
  font-weight: 400;
  color: gray;
  border-right: 1px solid gray;
}
.middle .capacity {
  flex: 1;
  font-size: 1em;
  font-weight: 400;
  color: gray;
}
</style>
