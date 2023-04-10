<template>
  <div class="recommends-view">
    <ul>
      <li v-for="item in recommends" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" :alt="`${item.title}图片`" />
          <span>{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RecommendsView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  text-align: center;
  padding: 1rem 0 2rem;
  border-bottom: 0.8rem solid #eee;
}
ul li {
  flex: 1;
}
ul li a img {
  width: 4rem;
  height: 4rem;
  margin-bottom: 0.8rem;
}
ul li a span {
  display: block;
}
</style>
