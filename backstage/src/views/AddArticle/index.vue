<template>
  <div class="content">
    <!-- 座右铭 -->
    <div class="title flex align-center">
      <span></span>
      <div>{{ userInfo.motto }}</div>
    </div>
    <!-- 三个input -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
      <el-form-item prop="title">
        <el-input
          v-model.trim="ruleForm.title"
          placeholder="请输入文章标题~~~~"
        ></el-input>
      </el-form-item>
      <el-form-item prop="description">
        <el-input
          v-model.trim="ruleForm.description"
          placeholder="请输入关于文章的描述"
        ></el-input>
      </el-form-item>
      <el-form-item prop="musicName">
        <el-input
          v-model.trim="ruleForm.musicName"
          placeholder="请输入音乐的名称~~~"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 上传文章封面图片 -->
    <div class="flex align-center">
      <el-upload
        drag
        class="avatar-uploader"
        action="http://localhost:5006/upload"
        :headers="token"
        name="image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="image" :src="image" class="avatar" />
        <i v-else class="el-icon-upload"></i>
        <div class="el-upload__text">拖拽上传封面图片，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <!-- mk -->
    <MarkDown @contentChange="contentChange" />
    <!-- 提交按钮 -->
    <div class="submit flex align-center">
      <el-button
        class="subBtn"
        type="primary"
        icon="el-icon-position"
        @click="addArticle"
        >发布</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MarkDown from "../../components/markdown.vue";
import { addArticle } from "../../api/article";
export default {
  name: "AddArticle",
  components: { MarkDown },
  computed: mapState(["userInfo"]), //mapState 返回的就是一个对象
  data() {
    return {
      ruleForm: {
        title: "",
        description: "",
        musicName: "",
        imgUrl: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 0, max: 20, message: "不能超过20个字", trigger: "blur" },
        ],
      },
      image: "",
      token: { authorization: "Bearer " + localStorage.getItem("token") },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // res jiushi
      this.image = URL.createObjectURL(file.raw);
      this.ruleForm.imgUrl = res.data;
      console.log(this.ruleForm.imgUrl);
      this.$message.success("图片上传成功");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isJPG && isLt2M;
    },

    contentChange(contents) {
      this.ruleForm.content = contents;
    },
    addArticle() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const data = this.ruleForm;
          addArticle(data).then((res) => {
            this.$message.success("添加文章成功");
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/deep/.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
/deep/.avatar-uploader {
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.ruleForm {
  flex: 1;
  margin-top: 40px;
}

.submit {
  justify-content: flex-start;
  margin-top: 20px;
}
</style>