<template>
  <div class="content">
    <div class="title flex align-center">
      <div class="flex align-center"><span></span>个人信息设置</div>
    </div>
    <div class="flex align-center">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:5006/upload"
            name="avatar"
            :headers="token"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="avatar_url" :src="avatar_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birthday"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="座右铭">
          <el-input v-model="form.motto"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updataAboutMe } from "../../api/user";
export default {
  name: "Seeting",
  inject: ["reload"],
  data() {
    return {
      token: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      avatar_url: "",
      form: {
        userName: "",
        birthday: "",
        avatar: "",
        motto: "",
      },
    };
  },
  methods: {
    // 处理上传的头像
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
    handleAvatarSuccess(res, file) {
      this.avatar_url = URL.createObjectURL(file.raw);
      this.$message.success("头像上传成功");
      console.log(res);
      this.form.avatar = res.data;
    },

    // 提交修改后的信息
    onSubmit() {
      updataAboutMe(this.form).then((res) => {
        this.$message.success(res.data.msg);
        this.reload();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  .title {
    margin-bottom: 35px;
  }
}
/deep/.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.submit {
  justify-content: flex-start;
  margin-top: 20px;
}
</style>