<template>
  <div>
    <div
      class="back wow flex align-center justify-center"
      @click="backTop"
      :class="type === 'show' ? 'show' : 'exit'"
    >
      Top
    </div>
  </div>
</template>

<script>
import { throttle } from "@utils";
export default {
  name: "backTop",
  data() {
    return {
      type: "exit",
    };
  },
  created() {
    this.listenScroll();
  },

  methods: {
    listenScroll() {
      window.addEventListener("scroll", throttle(this.scrollHandle, 300));
    },
    scrollHandle() {
      const scrollTop = Math.ceil(
        document.documentElement.scrollTop ||
          document.body.scrollTop ||
          window.pageYOffset
      );
      this.type = scrollTop > 600 ? "show" : "exit";
    },
    backTop() {
      const div = document.querySelector("#app");
      div.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
<style lang='less' scoped>
.back {
  position: fixed;
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
  right: 28px;
  bottom: 70px;
  color: #409eff;
  font-size: 14px;
  transition: all 0.3s;
  &.show {
    visibility: visible;
  }
  &.exit {
    opacity: 0;
  }
}
</style>