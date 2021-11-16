<template>
  <div id="app">
    <router-view v-if="IsRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    /* 通过将provide 和inject 组合使用可以实现 页面无痕刷新 */
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      IsRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.IsRouterAlive = false;
      this.$nextTick(() => {
        this.IsRouterAlive = true;
      });
    },
  },
};
</script>

// 在APP.vue中修改style标签 为lang='scss',则会启用scss-loader
<style lang="scss">
@import "/style/main.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>