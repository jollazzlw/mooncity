<template>
  <el-menu-item
    :index="router.path"
    :key="router.path"
    v-if="!router.hidden"
    class="flex align-center thunk"
  >
    <i :class="router.meta.icon"></i>
    <span slot="title">{{ router.meta.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    router: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang='scss' scoped>
.thunk {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding-left: 40px;
  line-height: 40px;
  text-align: left;
  border-radius: 23px 0 0 23px;
  color: #ffffff;
  font-size: 15px;
  &:hover {
    background-color: #fff !important;
    color: #0d80ff !important;
    i {
      color: #0d80ff;
    }
  }
  i {
    color: #ffffff;
    transition: all 0.3s;
  }
  &.is-active {
    background-color: #ffffff !important;
    color: #0d80ff;
    i {
      color: #0d80ff;
    }
  }
}
</style>