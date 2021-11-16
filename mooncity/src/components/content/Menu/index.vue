<template>
  <div>
    <div class="menu" @click="toMenu">
      <span
        class="iconfont"
        :class="isNav ? 'el-icon-close' : 'el-icon-menu'"
      ></span>
    </div>
    <div class="nav" :class="isNav ? 'navShow' : ''">
      <ul class="nav-list" v-for="item in menuList" :key="item.title">
        <li>
          <a @click="toPage(item.title)">{{ item.title }}</a>
        </li>
      </ul>
      <!-- <div class="world">
      <span>Everywhere in the world has a similar life.</span>
    </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      menuList: [
        { title: "Exhibit" },
        { title: "ArticleList" },
        { title: "Game" },
        { title: "Rainy" },
      ],
      isNav: false,
    };
  },

  methods: {
    toMenu() {
      this.isNav = !this.isNav;
      // overflowY 属性规定是否对内容的上/下边缘进行裁剪 - 如果内容溢出元素的内容区域。
      // hiddetn :裁剪内容，且不提供滚动机制 [没有滚动条，不能滚动了]，默认visible：不裁剪内容，可能会显示在内容框之外
      document.body.style.overflowY = this.isNav ? "hidden" : "";
    },
    toPage(title) {
      this.toMenu();
      if (this.$route.name === title) return;
      this.$router.push({ name: title });
    },
  },
};
</script>
<style lang='less' scoped>
.navShow {
  top: 0 !important;
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
.nav {
  position: fixed;
  left: 0;
  top: -100%;
  width: 100%;
  height: 100%;
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.96);
  transition: top 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  .nav-list {
    width: 80%;
    display: block;
    text-align: center;
    margin-top: -120px;
    li {
      margin: 0 20px 20px;
      list-style: none;
      display: inline-block;
      a {
        font-size: 24px;
        cursor: pointer;
        color: #666;
        letter-spacing: 1px;
        &:hover {
          color: #080808;
        }
      }
    }
    .world {
      width: 100%;
      position: absolute;
      bottom: 30px;
      display: block;
      text-align: center;
      color: #666;
      span {
        font-size: 16px;
      }
    }
  }
}
@media screen and (max-width: 780px) {
  .nav .nav-list li a {
    font-size: 18px;
  }
}
@media screen and (max-width: 480px) {
  .nav .world span {
    font-size: 14px;
  }
}
</style>