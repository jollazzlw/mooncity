<template>
  <div class="max">
    <div id="scene" class="img-outer">
      <div class="layer" data-depth="0.40">
        <img
          :src="require('@img/cnhk.jpg')"
          class="moveImg"
          :width="imgWidth"
          :height="imgHeight"
        />
      </div>
    </div>
    <div class="mask" />
    <div class="info">
      <div class="time">
        {{ date.year }} {{ date.month }}, {{ date.day }} {{ date.week }}
      </div>
      <H1 class="content">满天星河，与你相遇</H1>
    </div>
  </div>
</template>

<script>
import Parallax from "parallax-js";

import { throttle } from "@utils";

// import Menu from "@content/Menu";

export default {
  name: "giantScreen",
  components: {
    // Menu,
  },
  data() {
    return {
      imgWidth: null,
      imgHeight: null,
      date: {},
      // isNav: false, //用来更改菜单按钮
    };
  },

  created() {
    // bind event handlers to the handleResize method (defined below)
    window.addEventListener("resize", throttle(this.handleImageSize, 500));
    this.handleImageSize();
    this.getTimeToShow();
  },

  mounted() {
    //不会保证所有的子组件也都被挂载完成。
    //如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 mounted 内部使用 vm.$nextTick：
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码
      var scene = document.getElementById("scene");
      if (scene) {
        var parallaxInstance = new Parallax(scene, {
          relativeInput: true,
          clipRelativeInput: true,
        });
        parallaxInstance.friction(0.15, 0.15);
        parallaxInstance.scalar(10, 7); //控制x-y偏移范围
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleImageSize);
  },

  methods: {
    async getTimeToShow() {
      const date = new Date();
      const tDate = {};
      tDate.year = date.getFullYear(); //获取完整的年份(4位,1970-????)
      tDate.month = date.getMonth(); //获取当前月份(0-11,0代表1月)
      tDate.day = date.getDate(); //获取当前日(1-31)
      tDate.week = date.getDay(); //获取当前星期X(0-6,0代表星期天)
      this.date = await this.$store.dispatch("dataHandle", tDate);
      // console.log(this.date);
    },
    handleImageSize() {
      const wWidth = document.documentElement.clientWidth;
      const wHeight = document.documentElement.clientHeight;
      this.imgWidth = wWidth + 200;
      this.imgHeight = wHeight + 200;
      if (wWidth <= 900) {
        this.imgWidth = 1920 / 1.3;
        this.imgHeight = 960;
      }
    },
    /* toMenu() {
      this.isNav = !this.isNav;
      // overflowY 属性规定是否对内容的上/下边缘进行裁剪 - 如果内容溢出元素的内容区域。
      // hiddetn :裁剪内容，且不提供滚动机制 [没有滚动条，不能滚动了]，默认visible：不裁剪内容，可能会显示在内容框之外
      document.body.style.overflowY = this.isNav ? "hidden" : "";
    }, */
  },
};
</script>

<style lang='less' scoped>
//整个giantSreen
.max {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 9997;
  //图片上层的div
  .img-outer {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  //图片
  .moveImg {
    margin-bottom: 20px;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    max-width: none;
    display: block;
  }
  .menu {
    position: fixed;
    top: 10%;
    right: 3%;
    width: 30px;
    height: 30px;
    border-radius: 2px;
    z-index: 9999;
    cursor: pointer;
    color: var(--color-red);
    text-align: center;
    background: rgba(199, 202, 207, 0.8);
    span {
      color: #fffffd;
      font-size: 20px;
      line-height: 32px;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.3;
    background-color: #ffeb88;
    clip-path: polygon(0 0, 25% 0, 60% 100%, 0 100%);
    pointer-events: none;
  }
  .info {
    position: absolute;
    top: 45%;
    left: -3%;
    color: #e19f44;
    width: 30%;
    transform: translateY(-50%);
    // font-size: 0.5rem;
    .time {
      font-size: 20px;
    }
    .content {
      margin-top: 20px;
      font-size: 26px;
    }
  }
}
#scene {
  // height: 100%;
  position: relative;
  overflow: hidden;
  #image {
    position: absolute;
    max-width: none;
    display: block;
  }
}
</style>