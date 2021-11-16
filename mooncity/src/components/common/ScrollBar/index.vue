<template>
  <div class="scrollBar" :style="{ width: barWidth + '%' }"></div>
</template>

<script>
import { throttle } from "@utils";
export default {
  name: "ScrollBar",
  data() {
    return {
      scrollTop: 0,
      barWidth: 0,
      throttleScroll: () => {},
    };
  },
  created() {
    this.throttleScroll = throttle(this.scrollHandle, 300);
    window.addEventListener("scroll", this.throttleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.throttleScroll);
  },

  methods: {
    scrollHandle() {
      this.scrollTop = Math.ceil(
        document.documentElement.scrollTop ||
          document.body.scrollTop ||
          window.pageYOffset
      );
      // 可视区
      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 总内容高度
      const scrollHeight =
        document.documentElement.scrollHeight ||
        document.body.scrollHeight ||
        window.scrollHeight;

      this.barWidth =
        (Math.ceil(this.scrollTop) / Math.ceil(scrollHeight - windowHeight)) *
        100;
      this.$emit("scrollY", this.scrollTop);
    },
  },
};
</script>
<style lang='less' scoped>
.scrollBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999999;
  background: #ffcb4d;
  height: 2px;
  transition: all 0.3s linear;
}
</style>