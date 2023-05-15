<template>
<div>
  <van-nav-bar
      title="单车管理"
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
      <van-cell-group
          class="station-card"
          v-for="item in stationList"
          :key="item.id"
          :title="`站点编号: ${item.id}`"
          inset
      >
        <van-cell
            :title="item.stationName"
            :value="`当前容量: ${item.capacity}`"
            :label="item.address"
            icon="shop-o"
            center
            is-link
            @click="onStationClick(item)"
        />
      </van-cell-group>
<!--      <van-card-->
<!--          v-for="item in list"-->
<!--          :key="item.id"-->
<!--          :desc="描述信息"-->
<!--          :title="商品标题"-->
<!--          thumb="~assets/icon/placeholder2.png"-->
<!--      >-->
<!--        <template #tags>-->
<!--          <van-tag plain type="danger">{{}}</van-tag>-->
<!--        </template>-->
<!--        <template #footer>-->
<!--          <van-button size="mini">修改</van-button>-->
<!--          <van-button size="mini">删除</van-button>-->
<!--        </template>-->
<!--      </van-card>-->
    </van-list>
  </van-pull-refresh>

  <div class="placeholder"></div>

  <van-button icon="plus" type="primary" class="add-btn" @click="addStation"/>

  <van-popup v-model="showStationInfo" round :style="{width:'75%'}">
    <van-form>
      <van-field
          v-model="curStation.id"
          label="站点编号"
          disabled
      />
      <van-field
          v-model="curStation.stationName"
          label="站点名称"
          placeholder="请填写站点名称"
      />
      <van-field
          v-model="curStation.address"
          label="站点地址"
          placeholder="请填写站点地址"
      />
      <van-field
          v-model="curStation.capacity"
          label="站点容量"
          disabled
      />
      <div style="margin: 16px;">
        <van-row
            type="flex"
            justify="space-around"
        >
          <van-col span="6">
            <van-button round block type="primary" @click="updateStationInfo">修改</van-button>
          </van-col>
          <van-col span="6">
            <van-button round block type="danger" @click="deleteStation">删除</van-button>
          </van-col>
          <van-col span="9">
            <van-button round block type="info" @click="toBikes">所属单车</van-button>
          </van-col>
        </van-row>
      </div>
    </van-form>
  </van-popup>

  <van-popup v-model="showAddStationWizard" round :style="{width:'75%'}">
    <van-form>
      <van-field
          v-model="newStation.stationName"
          label="站点名称"
          placeholder="请填写站点名称"
      />
      <van-field
          v-model="newStation.address"
          label="站点地址"
          placeholder="请填写站点地址"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="addStationSubmit">添加</van-button>
      </div>
    </van-form>
  </van-popup>
</div>
</template>

<script>
import {addStation, deleteStation, getBikeListByStationId, getStationList, updateStation} from "network/profile";
import {Dialog, Toast} from "vant";

export default {
  name: "BikeManage",
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,

      stationList: [],
      curStation: {},
      newStation: {
        stationName: null,
        address: null,
        capacity: 0,
      },
      bikeList: [],

      showStationInfo: false,
      showAddStationWizard: false,

      pageNumber: 1,
      pageSize: 10,

      notShowLoadToast: false,
      notShowRefreshToast: false,
    }
  },
  methods: {
    onLoad() {
      // 如果是"刷新"操作而不是"加载"操作, 则先清空数据
      if (this.refreshing) {
        this.stationList = [];
        this.refreshing = false;
      }

      // 分页请求数据
      getStationList(this.pageNumber, this.pageSize).then(res => {
        if (res.result.length === 0) {
          this.finished = true;
        } else {
          this.stationList = [...this.stationList, ...res.result];
          this.loading = false;
          this.pageNumber++;

          if (this.notShowLoadToast) {
            this.notShowLoadToast = false;
          } else {
            Toast("加载成功");
          }
        }
      });
    },
    async onRefresh() {
      // 重置状态参数
      this.finished = false;
      this.pageNumber = 1;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      await this.onLoad();

      if (this.notShowRefreshToast) {
        this.notShowRefreshToast = false;
      } else {
        this.notShowLoadToast = true;
        Toast("刷新成功");
      }
    },
    onStationClick(curStation) {
      this.curStation = curStation;
      this.showStationInfo = true;
    },
    addStation() {
      this.showAddStationWizard = true;
      this.newStation.stationName = null;
      this.newStation.address = null;
    },
    addStationSubmit() {
      addStation(this.newStation).then(res => {
        if (res.success) {
          Toast(`成功添加新站点：${this.newStation.stationName}`);
          this.stationList = [];
          this.notShowLoadToast = true;
          this.notShowRefreshToast = true;
          this.onRefresh();
          this.showAddStationWizard = false;
        }
      })
    },
    updateStationInfo() {
      updateStation(this.curStation).then(res => {
        if (res.success) {
          Toast(`已更新${this.curStation.id}号站点的信息`);
          this.showStationInfo = false;
        }
      })
    },
    deleteStation() {
      Dialog.confirm({
        title: '特别提醒',
        message: '确认删除？该操作不可逆！',
      }).then(() => {
        deleteStation(this.curStation.id).then(res => {
          if (res.success) {
            this.stationList = [];
            this.notShowLoadToast = true;
            this.notShowRefreshToast = true;
            this.onRefresh();
            Toast(`已删除${this.curStation.id}号站点`);
            this.showStationInfo = false;
          }
        })
      }).catch(() => {
        Toast("取消删除");
      });
    },
    toBikes() {
      getBikeListByStationId(this.curStation.id).then(res => {
        if (res.success) {
          console.log(res);
          this.curStation.capacity = res.result.length;
        }
      })
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
.station-card {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
}
</style>