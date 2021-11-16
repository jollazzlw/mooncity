<template>
  <div>
    <MarkDown style="height: 700px" @contentChange="contentChange" />
    <div class="submit flex align-center">
      <el-button
        class="submit"
        type="primary"
        icon="el-icon-position"
        @click="saveAboutMe"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import MarkDown from "../../components/markdown.vue";
import { updataAboutMe } from "../../api/user";

export default {
  name: "AboutMe",
  data() {
    return {
      contents: "",
    };
  },
  components: {
    MarkDown,
  },
  methods: {
    contentChange(contents) {
      this.contents = contents;
    },
    saveAboutMe() {
      updataAboutMe({
        aboutMe: this.contents,
      });
    },
  },
};
</script>


<style lang='scss' scoped>
.submit {
  justify-content: flex-start;
  margin-top: 10px;
}
</style>
