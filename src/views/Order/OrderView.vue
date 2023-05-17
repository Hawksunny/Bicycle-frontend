<template>
  <div class="order-view">
    <van-empty
        class="empty-hint"
        v-if="isShowEmpty"
        image="https://img1.baidu.com/it/u=3819456810,657155443&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=677"
        description="\(- >< -)/"
    />

    <van-pull-refresh
        v-else
        v-model="refreshing"
        @refresh="onRefresh"
    >
      <van-list>
        <van-swipe-cell
            v-for="item in orderList"
            :key="item.id"
        >
          <van-card
              class="order-card"
              thumb="https://img0.baidu.com/it/u=1672076960,2798366385&fm=253&fmt=auto&app=138&f=PNG?w=500&h=501"
              @click="onCardClick(item)"
          >
            <template #title>
             <h5 class="card-content">订单编号: {{item.id}}</h5>
            </template>
            <template #desc>
              <p class="card-content">租者ID: {{item.uid}}</p>
              <p class="card-content">单车ID: {{item.bikeId}}</p>
              <p class="card-content">费用: {{item.fee}}</p>
              <p class="card-content">点击查看详细信息...</p>
            </template>
          </van-card>
          <template #right>
            <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="deleteOrder(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>

    <van-dialog v-model="showDetail">
      <van-cell-group inset>
        <van-cell title="租者ID" :value="curOrder.uid" />
        <van-cell title="单车ID" :value="curOrder.bikeId" />
        <van-cell title="租借时间" :value="rentalTime" />
        <van-cell title="出车站点ID" :value="curOrder.rentalStation" />
        <van-cell title="预计归还时间" :value="backTime" />
        <van-cell title="还车站点ID" :value="curOrder.backStation" />
        <van-cell title="费用" :value="curOrder.fee" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import {Toast} from "vant";
import {deleteOrder, getOrderListByUid} from "network/order";

export default {
  name: "OrderView",
  data() {
    return {
      refreshing: false,
      orderList: [],
      showDetail: false,
      curOrder: {},
      isShowEmpty: false,
    }
  },
  computed: {
    backTime() {
      return new Date(this.curOrder.backTime).toLocaleString();
    },
    rentalTime() {
      return new Date(this.curOrder.rentalTime).toLocaleString();
    },
  },
  methods: {
    onRefresh() {
      this.orderList = [];
      getOrderListByUid(parseInt(localStorage.getItem("uid"))).then(res => {
        if (res.success) {
          if (res.result.length === 0) {
            this.isShowEmpty = true;
          } else {
            this.isShowEmpty = false;
            this.orderList = [...this.orderList, ...res.result];
          }
          this.refreshing = false;
        }
      })
    },
    onCardClick(order) {
      this.showDetail = true;
      this.curOrder = order;
    },
    deleteOrder(id) {
      deleteOrder(id).then(res => {
        if (res.success) {
          Toast(res.msg);
          this.onRefresh();
        }
      })
    }
  },
  created() {
    this.orderList = [];
    this.onRefresh();
  },
  activated() {
    this.orderList = [];
    this.onRefresh();
  }
};
</script>

<style scoped>
.order-view {
  position: relative;
  height: calc(100vh - 49px);
  width: 100vw;
}
.empty-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.delete-button {
  height: 100%;
}
.order-card {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  margin: .5rem 0 .5rem .5rem;
}
.card-content {
  margin-left: 1rem;
}
</style>
