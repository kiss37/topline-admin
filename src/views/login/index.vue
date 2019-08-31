<template>
  <div class="login-warp">
    <div class="login-form-warp">
      <div class="logo">
        <img src="./img/login_logo.png" alt />
      </div>
      <div class="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-col :span="14">
              <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-button
                type="primary"
                plain
                @click="getCode"
                :disabled="sec != 60"
              >{{sec == 60 ? "获取验证码" : "还有" + sec +"秒" }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn-login" @click="doLogin('ruleForm')">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        mobile: "",
        code: ""
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确11位手机号", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入正确6位验证码", trigger: "blur" }
        ]
      },
      sec: 60
    };
  },
  methods: {
    // 获取验证码按钮
    getCode() {
      // 先判断手机号是否为空
      if (this.ruleForm.mobile == "") {
        this.$message.error("请输入正确的手机号");
        return;
      }

      // 先刚开始减少1秒 从59开始 增加体验感
      this.sec--;

      let timerID = setInterval(() => {
        this.sec--;

        //模拟到57秒的时候输入了验证码
        if (this.sec == 57) {
          this.ruleForm.code = "246810";
        }

        // 判断到0的时候清除定时器
        if (this.sec == 0) {
          clearInterval(timerID);
          this.sec = 60;
        }
      }, 1000);
    },
    // 登陆按钮点击事件
    doLogin(formName) {
      // 做判断
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 能走到这来表示通过所有规则 可以开始发送axios
          this.$axios
            .post(`http://ttapi.research.itcast.cn/mp/v1_0/authorizations`, {
              mobile: this.ruleForm.mobile,
              code: this.ruleForm.code
            })
            .then(res => {
              if (res.data.data) {
                this.$message({
                  message: "登陆成功",
                  type: "success"
                });
                // 跳转到网页
                this.$router.push("/home");
              } else {
                this.$message.error("账号密码错误");
              }
            })
            .catch( res => {
              this.$message({
                  message: "账号或密码错误！",
                  type: "error"
                });
            } )
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scopet>
.login-warp {
  height: 100%;
  background: url("./img/login_bg.jpg") center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form-warp {
    width: 450px;
    background-color: #fff;
    padding: 50px;
    border-radius: 20px;
    opacity: .8;
    .logo {
      text-align: center;
      margin-bottom: 25px;
      img {
        width: 150px;
      }
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>