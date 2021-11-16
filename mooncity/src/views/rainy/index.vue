<template>
  <div class="rain">
    <img
      src="/rainy/rain-bg.gif"
      alt="抱歉无法显示背景图片了"
      class="rain-bg"
    />
    <img src="/rainy/words.png" alt="抱歉无法显示文字了" class="rain-word" />
    <ul class="option flex align-center">
      <li
        v-for="(item, index) in rainIcon"
        :key="index"
        @click="changeRain(index, item.active)"
      >
        <span>
          <img :src="item.on" alt="" v-if="item.active" />
          <img :src="item.off" alt="图片无法显示" v-else />
        </span>
        <!-- music -->
        <audio class="music" loop="loop" preload="auto">
          <source type="audio/mpeg" :src="item.music" />
        </audio>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Rainy",
  data() {
    return {
      rainIcon: [
        {
          on: `/rainy/rain_on.png`,
          off: `/rainy/rain_off.png`,
          music: `/rainy/rain.mp3`,
          active: false,
        },
        {
          on: `/rainy/rain2_on.png`,
          off: `/rainy/rain2_off.png`,
          music: `/rainy/thunder.mp3`,
          active: false,
        },
        {
          on: `/rainy/rain3_on.png`,
          off: `/rainy/rain3_off.png`,
          music: `/rainy/loudThunder.mp3`,
          active: false,
        },
      ],
    };
  },
  methods: {
    changeRain(type, active) {
      this.$set(this.rainIcon[type], "active", !active);
      let music = document.getElementsByClassName("music");
      if (!active) {
        music[type].play();
      } else {
        music[type].pause();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.rain {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  .rain-word {
    position: fixed;
    top: 90px;
    right: 150px;
  }
  .rain-bg {
    width: 100%;
    height: 100%;
  }
  .option {
    width: auto;
    height: 70px;
    position: fixed;
    bottom: 0;
    right: 0;
    text-align: center;
    li {
      display: inline-block;
      list-style-type: none;
      cursor: pointer;
      span {
        display: inline-block;
      }

      img {
        width: 108px;
        height: 73px;
        line-height: 73px;
      }
    }
  }
}
</style>
