<template>
  <div class="comment-box">
    <div class="inputContent">
      <!-- 用户名 -->
      <div class="topInput">
        <el-input
          v-model.trim="form.userName"
          placeholder="Name"
          class="userName"
          :disabled="noEditName && isOrNoUser"
        />
        <!-- <span></span> -->

        <button
          class="edit"
          type="button"
          @click="editUserName"
          v-if="isOrNoUser"
          v-html="!noEditName ? 'Save' : 'Edit Name'"
        >
          Edit Name
        </button>
      </div>
      <!-- @标签 -->
      <div>
        <transition name="el-fade-in-linear">
          <el-tag
            effect="dark"
            closable
            class="tag"
            @close="tagClose"
            v-if="aiteName"
            size="small"
            >@{{ aiteName }}
          </el-tag>
        </transition>
      </div>
      <!-- 文本域 -->
      <div>
        <textarea
          resize="none"
          rows="10"
          maxlength="500"
          placeholder="What do you want to say..."
          v-model="form.content"
          class="userContent"
        >
        </textarea>
      </div>
      <!-- 提交按钮 -->
      <div class="bottom flex align-center">
        <button id="comment" type="button" @click="submitVerify">SUBMIT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentInput",
  data() {
    return {
      form: {
        userName: "",
        content: "",
      },
      noEditName: true,
    };
  },
  computed: {
    isOrNoUser() {
      return !!this.hasUserName;
    },
  },
  props: {
    aiteName: {
      type: String,
      default: "",
    },
    hasUserName: {
      type: String,
      dafault: "",
    },
  },
  watch: {
    hasUserName(val) {
      if (val) {
        this.form.userName = val;
      }
    },
  },
  created() {},
  methods: {
    // 提交评论
    submitVerify() {
      //没有输入内容，我们直接返回
      if (!this.form.userName || !this.form.content) {
        console.log("没有用户名或者评论");
        return;
      }

      // 第一次来。我们就需要创建一个用户
      if (!this.isOrNoUser) {
        this.$emit("addUser", this.form);
        return;
      }

      // 有用户名之后到这里是有用户和评论的的情况了我们需要进行评论的提交
      this.$emit("addArtCom", this.form, () => {
        this.form.content = "";
      });
    },
    // 用户修改用户名
    editUserName() {
      this.noEditName = !this.noEditName;
      if (this.noEditName) {
        this.$emit("editUserName", this.form.userName);
      }
    },
    // 关闭@
    tagClose() {
      this.$emit("tagClose");
    },
  },
};
</script>
<style lang="less" scoped>
.inputContent {
  margin: 80px 0px 60px 0px;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 15px 12px;
  transition: all 0.3s;
  font-size: 14px;
  color: #333333;
  text-align: left;
  &.hiddenOuter {
    border: none;
    padding: 0;
  }
  .tag {
    margin-top: 10px;
    border-radius: 20px;
  }
  .topInput {
    position: relative;
    .userName {
      width: 50%;
      /deep/ .el-input__inner {
        border: 1px dashed #f0f0f0 !important;
        &:focus {
          border-color: #409eff !important;
        }
      }
    }
    .edit {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 0;
    }
  }
  // .userName,
  .userContent {
    box-sizing: border-box;
    resize: none;
    width: 100%;
    font-size: 14px;
    transition: all 0.3s;
    margin: 10px 0;
    padding: 15px;
    border: none;
    border-radius: 4px;
    border: 1px dashed #f0f0f0;
    outline: none;
    background: url("~@img/hmbb.jpg") no-repeat 0px 0px fixed;
    &:focus {
      border-color: #409eff;
    }
  }
  button {
    height: 34px;
    line-height: 36px;
    width: 120px;
    font-size: 14px;
    color: #5f5f5f;
    border-radius: 6px;
    background: #eaeaea;
    cursor: pointer;
    outline: none;
    border: none;
    margin-right: 12px;
    transition: all 0.3s;
    &:hover,
    &.active {
      color: #fff;
      background: #409eff;
    }
  }
}
</style>