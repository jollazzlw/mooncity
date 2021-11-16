<template>
  <div id="app">
    <BackTop />
    <pageTopLoad />
    <Menu />
    <keep-alive :exclude="['Detail']">
      <router-view :key="routerId" />
    </keep-alive>
  </div>
</template>
<script>
import BackTop from "@common/BackTop";
import pageTopLoad from "@common/pageTopLoadScrollBar";
import Menu from "@content/Menu";
export default {
  components: {
    BackTop,
    pageTopLoad,
    Menu,
  },
  computed: {
    routerId() {
      // console.log(this.$route);
      return this.$route.name;
    },
  },
};
</script>

<style lang='less' >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
