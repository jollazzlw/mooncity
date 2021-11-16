<template>
  <div class="nav flex flex-column align-center">
    <div class="info flex flex-column align-center">
      <div class="imgouter flex align-center justify-center">
        <img
          :src="
            userInfo.avatar
              ? `http://localhost:5006/user/avatar/${userInfo.avatar}`
              : require('@img/avatar.png')
          "
        />
      </div>
      <span class="userName">{{ userInfo.userName }}</span>
    </div>
    <el-menu
      :default-active="defaultPath"
      active-text-color="#0d80ff"
      :router="true"
      class="el-menu-vertical-demo navList"
      background-color="#0D80FF"
      text-color="#fff"
    >
      <!-- :router 是否使用 vue-router 的模式，启用该模式会在激活导航时以el-menu-item的 index 作为 path 进行路由跳转 -->
      <nav-item v-for="router of routes" :key="router.id" :router="router" />
    </el-menu>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import NavItem from "./navItem";
import { getSelfInfo } from "../../../api/user";

export default {
  name: "Nav",
  data() {
    return {
      routes: [],
      defaultPath: "",
    };
  },
  computed: mapState(["userInfo"]), //
  components: {
    NavItem,
  },
  created() {
    /* 
    $router   里面是我们创建vue-router的时候new出来那个vue-router
    $route    里面是当前所在路由的一些信息
     */
    this.routes = this.$router.options.routes;
    this.defaultPath = this.$route.matched[0].path;
    this.getSelfInfo();
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    async getSelfInfo() {
      try {
        const result = await getSelfInfo();
        this.setUserInfo(result.data.data);
        // console.log(this.$store.state.userInfo);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.nav {
  background-color: #0d80ff;
  width: 18vw;
  height: 100vh;
  color: #ffffff;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 0px 10px 20px #0d80ff;
  .navList {
    width: 100%;
    margin-top: 60px;
  }
  .info {
    margin-top: 100px;
    .userName {
      font-size: 20px;
      color: #fff;
    }
    .imgouter {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    span {
      margin-top: 16px;
    }
  }
}
// 这个deep会穿透到下面的作用域
/deep/ .el-menu {
  border-radius: 23px 0 0 23px;
  color: #0d80ff;
  padding-left: 30px;
  background-color: rgba(0, 0, 0, 0);
}
</style>