<template>
  <div class="tab-bar-item" @click="click">
    <div v-if="isActive" class="tb-icon-ac">
      <slot name="icon_ac"></slot>
    </div>
    <div v-else class="tb-icon">
      <slot name="icon"></slot>
    </div>
    <div class="tb-text" :style="textStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    to: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#666",
    },
    activeColor: {
      type: String,
      default: "#f00",
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.to) !== -1;
    },
    textStyle() {
      return {
        color: this.isActive ? this.activeColor : this.color,
      };
    },
  },
  methods: {
    click() {
      if (!this.isActive) {
        this.$router.push(this.to);
      }
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
}
</style>
