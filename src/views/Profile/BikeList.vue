<template>
<div>
  <van-nav-bar
      :title="`${$route.params.sid}号站点所属单车`"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
      class="nav-bar"
      fixed
      placeholder
  />

  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list>
      <van-card
          v-for="item in bikeList"
          :key="item.id"
          :title="`单车编号: ${item.id}`"
          thumb="https://img0.baidu.com/it/u=1373351728,59979873&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      >
        <template #desc>
          <p>品牌: {{item.brand}}</p>
          <p>类型: {{item.type}}</p>
          <p>颜色: {{item.color}}</p>
        </template>
        <template #tags>
          <van-tag plain type="danger" v-if="item.status === 0">占用</van-tag>
          <van-tag plain type="success" v-else-if="item.status === 1">空闲</van-tag>
          <van-tag plain type="warning" v-else-if="item.status === 2">维修</van-tag>
        </template>
        <template #footer>
          <van-button size="mini" @click="showBikeInfo(item)">修改</van-button>
          <van-button size="mini" @click="deleteBike(item.id)">删除</van-button>
        </template>
      </van-card>
    </van-list>
  </van-pull-refresh>

  <div class="placeholder"></div>

  <van-button icon="plus" type="primary" class="add-btn" @click="showAddBikeWizard"/>

  <van-popup v-model="isShowAddBikeWizard" round :style="{width:'75%'}">
    <van-form>
      <van-field
          v-model="newBike.brand"
          label="单车品牌"
          placeholder="单车品牌"
      />
      <van-field
          v-model="newBike.type"
          label="单车类型"
          placeholder="单车类型"
      />
      <van-field
          v-model="newBike.color"
          label="单车颜色"
          placeholder="单车颜色"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="addBike">添加</van-button>
      </div>
    </van-form>
  </van-popup>

  <van-popup v-model="isShowBikeInfo" round :style="{width:'75%'}">
    <van-form>
      <van-field
          v-model="curBike.id"
          label="单车编号"
          placeholder="单车编号"
          disabled
      />
      <van-field
          v-model="curBike.brand"
          label="单车品牌"
          placeholder="单车品牌"
      />
      <van-field
          v-model="curBike.type"
          label="单车类型"
          placeholder="单车类型"
      />
      <van-field
          v-model="curBike.color"
          label="单车颜色"
          placeholder="单车颜色"
      />
      <van-field
          v-model="curBike.fromStation"
          label="所属站区"
          placeholder="所属站区"
          disabled
      />
      <van-radio-group v-model="curBike.status" direction="horizontal" class="status-group">
        <van-radio :name="0">占用</van-radio>
        <van-radio :name="1">空闲</van-radio>
        <van-radio :name="2">维修</van-radio>
      </van-radio-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="updateBikeInfo">更新</van-button>
      </div>
    </van-form>
  </van-popup>
</div>
</template>

<script>
import * as types from "@/store/mutaion-types";
import {Dialog, Toast} from "vant";
import {addBike, updateStation, updateBikeInfo, deleteBike, getBikeListByStationId} from "network/profile";

export default {
  name: "BikeList",
  data() {
    return {
      refreshing: false,

      newBike: {
        brand: null,
        type: null,
        color: null,
        status: 0,
        fromStation: null,
      },
      curBike: {},

      isShowBikeInfo: false,
      isShowAddBikeWizard: false,

      isShowLoadToast: false,
      isShowRefreshToast: false,
    }
  },
  computed: {
    bikeList() {
      return this.$store.state.bikeList;
    },
    curStation() {
      return this.$store.state.curStation;
    }
  },
  methods: {
    onRefresh() {
      this.bikeList = [];
      this.bikeList = [...this.bikeList, ...this.$store.state.bikeList];
      Toast("刷新成功");
      this.refreshing = false;
    },

    showAddBikeWizard() {
      this.newBike.brand = null;
      this.newBike.type = null;
      this.newBike.color = null;
      this.newBike.fromStation = this.$store.state.curStation.id;
      this.isShowAddBikeWizard = true;
    },
    addBike() {
      addBike(this.newBike).then(res => {
        if (res.success) {
          Toast("添加成功");
          this.isShowAddBikeWizard = false;
          this.$store.commit({
            type: types.ADD_BIKE,
            bike: this.newBike,
          });
          this.$store.commit(types.INCREASE_STATION_CAPACITY);
          updateStation(this.curStation);
          getBikeListByStationId(this.curStation.id).then(res => {
            if (res.success) {
              this.$store.commit({
                type: types.BIKE_LIST_INIT,
                bikeList: res.result,
              });
            }
          });
        }
      });
    },

    showBikeInfo(bike) {
      this.isShowBikeInfo = true;
      this.curBike = bike;
    },
    updateBikeInfo() {
      updateBikeInfo(this.curBike).then(res => {
        if (res.success) {
          Toast(res.msg);
          this.isShowBikeInfo = false;
        }
      })
    },

    deleteBike(id) {
      Dialog.confirm({
        title: '特别提醒',
        message: '确认删除？该操作不可逆！',
      }).then(() => {
        deleteBike(id).then(res => {
          if (res.success) {
            Toast(res.msg);
            this.isShowBikeInfo = false;
            this.$store.commit(types.DECREASE_STATION_CAPACITY);
            updateStation(this.curStation);
            getBikeListByStationId(this.curStation.id).then(res => {
              if (res.success) {
                this.$store.commit({
                  type: types.BIKE_LIST_INIT,
                  bikeList: res.result,
                });
              }
            });
          }
        });
      });
    },
  }
}
</script>

<style scoped>
.add-btn {
  position: fixed;
  right: 1.5rem;
  bottom: 59px;
  z-index: 99;
  opacity: .8;
}
.placeholder {
  width: 100vw;
  height: 3rem;
}
.status-group {
  margin-left: 2.5rem;
}
</style>