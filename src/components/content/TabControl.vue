<template>
  <div class="tab-control">
    <ul>
      <li
        v-for="(item, index) in tabs"
        :key="item"
        :class="{ active: curIndex === index }"
        @click="click(index)"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },
  mounted() {
    // 同步主页中的两个 tabControl 的行为
    this.$bus.$on("tabControlSync", (index) => {
      this.curIndex = index;
    });
  },
  methods: {
    click(index) {
      this.curIndex = index;
      this.$emit("tabControlClick", index);
      // 同步主页中的两个 tabControl 的行为
      this.$bus.$emit("tabControlSync", index);
    },
  },
};
</script>

<style scoped>
.active span {
  border-bottom: 0.2rem solid var(--color-highlight-text);
  color: var(--color-highlight-text);
}
ul {
  display: flex;
  text-align: center;
  background-color: #fff;
}
ul li {
  flex: 1;
  height: 2.5rem;
  line-height: 2.5rem;
}
ul li span {
  padding: 0.5rem;
}
</style>
