<template>
  <div id="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="login-wrap login-form"
      inline
    >
      <div class="title">欢迎来到后台管理系统</div>
      <el-form-item
        prop="account"
        label="账号"
        label-width="50px"
        class="item-form"
      >
        <el-input
          v-model="ruleForm.account"
          autocomplete="off"
          placeholder="请输入登录账号"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="password"
        label="密码"
        label-width="50px"
        class="item-form"
      >
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入登录密码"
        ></el-input>
      </el-form-item>

      <el-form-item class="item-form" inline="false">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          class="login-btn block"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../../api/user";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      // 这里拿到的formName是提交方法传入的字符串ruleForm用来找到refs的form
      this.$refs[formName].validate((valid) => {
        if (!valid) return; //如果没有传入
        login({
          account: this.ruleForm.account,
          password: this.ruleForm.password,
        }).then(
          (res) => {
            localStorage.setItem("token", res.data.data); //将拿到的token放入localStorage里面
            setTimeout(() => {
              this.$router.push("/home");
              this.$message.success("登录成功");
            }, 500);
          },
          (err) => {
            console.log(err);
          }
        );
      });
    },
  },
};
</script>
<style lang='scss' scoped>
#login {
  height: 100vh;
  background: linear-gradient(to bottom right, #50a3a2, #53e3a6);
  overflow: hidden;
}
.login-wrap {
  width: 330px;
  margin: auto;
  // margin-top: 200px;
}
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  padding: 40px 50px 24px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-box-shadow: 0 2px 10px #e6e6e6;
  box-shadow: 0 2px 10px #e6e6e6;
  z-index: 9;
  label {
    width: 40px;
    display: block;
    font-size: 14px;
    color: #000;
    text-align: left;
  }
  .title {
    font-size: 22px;
    color: #0b9aff;
    letter-spacing: 2px;
    margin: 10px 0 24px;
  }
  .item-form {
    margin-bottom: 20px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 9px;
  }
}
</style>


