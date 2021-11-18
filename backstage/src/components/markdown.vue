<template>
  <div class="mavonEditor">
    <mavon-editor
      :subfield="true"
      @change="mkChange"
      @save="mkSave"
      v-model="content"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
      ref="md"
    />
  </div>
</template>

<script>
import { uploadImg } from "../api/user";

export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    mkChange(value) {
      this.content = value;
      this.$emit("contentChange", this.content);
    },
    mkSave(value) {
      this.content = value;
      this.$emit("contentChange", this.content);
    },
    async imgAdd(pos, $file) {
      // 将图片上传
      const formdata = new FormData();
      formdata.append("image", $file);
      // console.log(formdata.get("file"));
      try {
        const res = await uploadImg(formdata);
        const url = `${this.mainUrl}/img/${res.data.data}`;
        this.$refs.md.$img2Url(pos, url);
      } catch (error) {
        console.error(error);
      }
    },
    imgDel() {
      console.log("删除图片");
    },
  },
};
</script>
<style lang='scss' scoped>
.mavonEditor {
  margin-top: 30px;
  height: 100%;
  .v-note-wrapper {
    height: 100%;
  }
}
</style>