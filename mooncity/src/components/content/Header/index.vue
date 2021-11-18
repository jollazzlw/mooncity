<template>
  <div class="header">
    <ScrollBar @scrollY="handleScroll" />
    <!-- the music btn play and pause -->
    <div class="left flex">
      <i
        class="iconfont"
        :class="isPlay ? 'icon-bofang1' : 'icon-zanting'"
        @click="changeMusic"
      ></i>
    </div>
    <!-- the article Name -->
    <div class="mid" :class="{ active }">{{ title }}</div>
    <!-- the right {like-icon  avatat} -->
    <div class="right flex align-center">
      <div
        class="iconfont"
        :class="hadLike ? 'icon-keaide' : 'icon-aixin'"
        @click="likeArticle"
      ></div>
      <router-link :to="{ name: 'Exhibit' }"
        ><img loop :src="mainUrl + '/user/avatar/' + avatar" alt="头像" />
      </router-link>
    </div>
    <!-- dont like too much  icon-->
    <div class="like-box" :class="{ likeHint }">
      <div class="like-hint">只能点赞一次哦！感谢支持</div>
      <span></span>
      <span></span>
    </div>
    <!-- MusicBar-->
    <div class="musicBar" :style="{ width: progressLength }"></div>
    <!-- musci -->
    <audio id="music" loop preload="auto">
      <source type="audio/mpeg" :src="mainUrl + '/audio/' + music" />
    </audio>
  </div>
</template>

<script>
import ScrollBar from "@common/ScrollBar";
export default {
  name: "Header",
  components: { ScrollBar },
  props: {
    title: {
      type: String,
      default: "人生得意须尽欢",
    },
    music: {
      type: String,
      default: "music1.mp3",
    },
    avatar: {
      type: String,
      default: "avatar-1.jpg",
    },
  },
  data() {
    return {
      progressLength: 0, //musicBar 的宽度
      active: false,
      hadLike: false, //表示喜欢没
      likeHint: false, //用来显示喜欢的提示框
      isPlay: false,
      audioDOM: "",
    };
  },
  created() {
    this.hadLike = !!localStorage.getItem(`like-${this.$route.path.substr(1)}`);
  },
  mounted() {
    this.initMusic();
  },
  watch: {
    music() {
      this.initMusic();
    },
  },
  methods: {
    likeArticle() {
      // 先看下是不是喜欢过了，
      this.hadLike = !!localStorage.getItem(
        `like-${this.$route.path.substr(1)}`
      );
      // 没有喜欢就会设置一个localStorage
      localStorage.setItem(`like-${this.$route.path.substr(1)}`, true);
      //发出喜欢时间给detail,在那里会依据是否已经喜欢来判断要不要给喜欢数+1
      this.$emit("like", this.hadLike);
      //不管之前喜不喜欢，反正现在肯定是喜欢了
      this.hadLike = this.hadLike || true;
      // 显示表示，不要重复点
      this.likeHint = true;
      setTimeout(() => {
        this.likeHint = false;
      }, 2000);
    },
    // 处理页面滚动，来显示title的
    handleScroll(scrollTop) {
      if (!this.active && scrollTop >= 200) {
        this.active = true;
      } else if (this.active && scrollTop <= 200) {
        this.active = false;
      }
    },
    // 初始化音乐。获取audio的dom
    initMusic() {
      this.audioDOM = document.querySelector("#music");
      this.audioDOM.load();
    },
    async changeMusic() {
      this.isPlay = !this.isPlay;
      this.handleMusicBar();
      this.isPlay ? this.audioDOM.play() : this.audioDOM.pause();
    },
    handleMusicBar() {
      if (!this.music) return;
      const fn = () => {
        setTimeout(() => {
          this.progressLength =
            (
              (100 * this.audioDOM.currentTime) /
              this.audioDOM.duration
            ).toFixed(2) + "%";
          /* console.log(this.audioDOM.currentTime);
          console.log(this.audioDOM.duration); */
          // this.percent = result;
          if (this.isPlay) {
            fn();
          }
        }, 50);
      };
      fn();
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #f6f7f8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
  padding: 0 15px 0px 0px;
  background: #fff;
  z-index: 99999;
  transition: all 0.3s;
  .left {
    img {
      width: 30px;
      height: auto;
      opacity: 0.8;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        animation: jump 1s infinite alternate;
      }
    }
    .iconfont {
      color: #888;
      margin: 0px 20px;
      cursor: pointer;
      font-size: 24px;
      transition: all 0.3s;
      &:hover {
        color: #000;
      }
    }
  }
  .mid {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.8s;
    text-align: center;
    opacity: 0;
    &.active {
      opacity: 1;
    }
  }

  .right {
    .iconfont {
      font-size: 26px;
      margin: 0 16px;
      cursor: pointer;
      color: #888;
      transition: all 0.3s;
      &:hover {
        color: #ef6d57;
      }
      &.icon-keaide {
        color: #ef6d57;
      }
    }
    img {
      width: 30px;
      height: auto;
      border-radius: 50%;
    }
  }

  .like-box {
    position: absolute;
    top: 60px;
    right: 75px;
    transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    transform-origin: right top;
    transform: scale(0);
    opacity: 0;
    visibility: hidden;
    .like-hint {
      position: absolute;
      top: 30px;
      right: 40px;
      background: #ef6c57;
      color: #fffffe;
      font-size: 16px;
      width: 210px;
      height: 110px;
      line-height: 114px;
      text-align: center;
      border-radius: 60px;
    }
    span {
      position: absolute;
      top: 13px;
      right: 13px;
      height: 28px;
      width: 28px;
      border-radius: 50%;
      background: #ef6b57;
      &:last-child {
        width: 14px;
        height: 14px;
        right: 0;
        top: 0;
      }
    }
    &.likeHint {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
  .musicBar {
    position: absolute;
    height: 100%;
    width: 0;
    z-index: -1;
    background: #eee;
  }
}

@media screen and (max-width: 600px) {
  .header {
    position: absolute;
  }
  .mid {
    font-size: 14px;
  }
  .music-btn {
    opacity: 0;
    // display: none;
    &.show {
      display: block;
      visibility: visible;
      animation: fadeInTop 0.6s both;
    }
    &.exit {
      display: block;
      opacity: 0;
      animation: fadeInDown 0.6s both;
    }
  }
}
@keyframes jump {
  0% {
    transform: translateY(0px) scale(1);
  }
  60% {
    transform: translateY(2px) scale(1.1);
  }
  100% {
    transform: translateY(-4px) scale(1);
  }
}
@keyframes fadeInTop {
  from {
    opacity: 0;
    transform: translate(0, 30px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes fadeInDown {
  from {
    opacity: 1;
    transform: translate(0, 0px);
  }
  to {
    opacity: 0;
    visibility: hidden;
    transform: translate(0, 30px);
  }
}
</style>