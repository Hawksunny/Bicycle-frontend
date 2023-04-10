<template>
  <div class="card-item" @click="itemClick">
    <img
      class="item-img"
      src="~assets/icon/placeholder2.png"
      alt="商品图片"
      @load="imageLoaded"
    />
    <div class="info">
      <p class="sl-overflow">{{ title }}</p>
      <span class="type">{{ type }}</span>
      <span class="status">{{ status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      imgLink: "",
      title: this.goodsItem.brand + "-" + this.goodsItem.color,
      type: this.goodsItem.type,
      status: this.goodsItem.status,
    };
  },
  methods: {
    imageLoaded() {
      this.$bus.$emit("goodImgLoaded");
    },
    itemClick() {
      this.$router.push({
        name: "detail",
        params: {
          iid: this.goodsItem.id,
        },
      });
      // this.$router.push(`/detail/${this.goodsItem.id}`);
    },
  },
};
</script>

<style scoped>
.card-item {
  position: relative;
  padding-bottom: 2.5em;
}

.card-item img {
  width: 100%;
  border-radius: 1.1rem;
}

.info {
  position: absolute;
  bottom: 0.25em;
  left: 0;
  right: 0;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
}

.type {
  color: var(--color-price);
  margin-right: 1.5em;
}

.status {
  position: relative;
  padding-left: 1.2em;
}

.status::before {
  content: "";
  width: 1em;
  height: 1em;
  background: no-repeat url(assets/icon/star.svg) 0 0/1em 1em;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}

.item-img {
  min-height: 5em;
}
</style>
