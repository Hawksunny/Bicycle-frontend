<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="(item, id) in banners" :key="id">
        <a :href="item.link">
          <img
            :src="item.image"
            :alt="`${item.title}图片`"
            @load="swiperImgLoaded"
          />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/Swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isImgLoaded: false,
    };
  },
  methods: {
    swiperImgLoaded() {
      if (!this.isImgLoaded) {
        this.$bus.$emit("swiperImgLoaded");
      } else {
        this.isImgLoaded = true;
      }
    },
  },
};
</script>

<style scoped></style>
